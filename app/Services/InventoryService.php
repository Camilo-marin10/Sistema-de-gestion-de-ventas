<?php

namespace App\Services;

use App\Models\ProductVariant;
use App\Models\Sale;
use App\Models\StockMovement;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;

/**
 * Único punto de entrada para modificar el stock.
 * Cada cambio bloquea la fila de la variante (evita carreras entre ventas simultáneas)
 * y deja un movimiento en el kardex con el saldo antes y después.
 */
class InventoryService
{
    /** Estados de venta en los que el stock ya debe estar descontado. */
    public const DEDUCTED_STATUSES = ['confirmado', 'preparacion', 'enviado', 'entregado'];

    /**
     * Registra un movimiento manual o automático.
     *
     * @param  string  $type      inicial | entrada | salida | ajuste | venta | devolucion
     * @param  int  $quantity  unidades del movimiento (en "ajuste" es el nuevo saldo absoluto)
     */
    public function move(
        ProductVariant $variant,
        string $type,
        int $quantity,
        string $reason,
        ?User $user = null,
        ?string $note = null,
        ?Sale $sale = null,
    ): StockMovement {
        if (! array_key_exists($type, StockMovement::TYPE_LABELS)) {
            throw new InvalidArgumentException("Tipo de movimiento inválido: {$type}");
        }
        if ($quantity < 0 || ($type !== 'ajuste' && $quantity === 0)) {
            throw ValidationException::withMessages(['quantity' => 'La cantidad debe ser mayor a cero.']);
        }

        return DB::transaction(function () use ($variant, $type, $quantity, $reason, $user, $note, $sale) {
            /** @var ProductVariant $locked */
            $locked = ProductVariant::with('product:id,name')->lockForUpdate()->findOrFail($variant->id);
            $before = $locked->stock;

            $after = match ($type) {
                'ajuste' => $quantity,
                'salida', 'venta' => $before - $quantity,
                default => $before + $quantity,
            };

            if ($after < 0) {
                throw ValidationException::withMessages([
                    'quantity' => "Stock insuficiente para {$locked->sku}: hay {$before} und. y se intentan retirar {$quantity}.",
                ]);
            }
            if ($type === 'ajuste' && $after === $before) {
                throw ValidationException::withMessages(['quantity' => "El stock de {$locked->sku} ya es {$before} und. No hay nada que ajustar."]);
            }

            $locked->forceFill(['stock' => $after])->save();
            $variant->setRawAttributes($locked->getAttributes(), true);

            return StockMovement::create([
                'product_variant_id' => $locked->id,
                'product_name' => $locked->product->name,
                'sku' => $locked->sku,
                'variant_label' => "{$locked->size} / {$locked->color}",
                'type' => $type,
                'quantity' => $after - $before,
                'stock_before' => $before,
                'stock_after' => $after,
                'reason' => $reason,
                'note' => $note,
                'user_id' => $user?->id,
                'sale_id' => $sale?->id,
            ]);
        });
    }

    /**
     * Cambia el estado de una venta y ajusta el stock en la misma transacción.
     * Si no hay stock suficiente, la venta NO cambia de estado.
     * Es el método que deben usar el módulo de ventas y el portal del vendedor.
     */
    public function changeSaleStatus(Sale $sale, string $status, ?User $user = null): Sale
    {
        if (! array_key_exists($status, Sale::STATUS_LABELS)) {
            throw new InvalidArgumentException("Estado de venta inválido: {$status}");
        }

        return DB::transaction(function () use ($sale, $status, $user) {
            $sale->status = $status;
            if ($status !== 'pendiente' && $status !== 'cancelado' && ! $sale->confirmed_at) {
                $sale->confirmed_at = now();
            }
            $sale->save();
            $this->syncSaleStock($sale, $user);

            return $sale->refresh();
        });
    }

    /**
     * Mantiene el stock alineado con el estado de la venta:
     *  - pasa a un estado confirmado y aún no descontó → descuenta todas sus prendas.
     *  - pasa a "cancelado" habiendo descontado        → devuelve las unidades.
     * Es idempotente: llamarla varias veces no descuenta dos veces.
     */
    public function syncSaleStock(Sale $sale, ?User $user = null): void
    {
        if (in_array($sale->status, self::DEDUCTED_STATUSES, true) && ! $sale->stock_deducted_at) {
            $this->deductSale($sale, $user);
        } elseif ($sale->status === 'cancelado' && $sale->stock_deducted_at) {
            $this->restockSale($sale, $user);
        }
    }

    /** Descuenta el stock de todas las prendas de la venta (todo o nada). */
    public function deductSale(Sale $sale, ?User $user = null): void
    {
        DB::transaction(function () use ($sale, $user) {
            $sale->loadMissing('items');
            $items = $sale->items->whereNotNull('product_variant_id');

            // Validación previa: si alguna prenda no alcanza, no se descuenta ninguna.
            $needed = $items->groupBy('product_variant_id')->map->sum('quantity');
            $variants = ProductVariant::whereIn('id', $needed->keys())->lockForUpdate()->get()->keyBy('id');
            $missing = [];
            foreach ($needed as $variantId => $qty) {
                $variant = $variants->get($variantId);
                if (! $variant || $variant->stock < $qty) {
                    $missing[] = ($variant->sku ?? "variante #{$variantId}").' (disponible: '.($variant->stock ?? 0).", requerido: {$qty})";
                }
            }
            if ($missing) {
                throw ValidationException::withMessages(['stock' => 'Stock insuficiente para confirmar la venta: '.implode('; ', $missing).'.']);
            }

            foreach ($items as $item) {
                $this->move($variants[$item->product_variant_id], 'venta', $item->quantity, "Venta {$sale->code}", $user, null, $sale);
            }

            $sale->forceFill(['stock_deducted_at' => now()])->saveQuietly();
        });
    }

    /** Devuelve al inventario las unidades de una venta que había descontado stock. */
    public function restockSale(Sale $sale, ?User $user = null): void
    {
        DB::transaction(function () use ($sale, $user) {
            $sale->loadMissing('items');
            foreach ($sale->items->whereNotNull('product_variant_id') as $item) {
                $variant = ProductVariant::find($item->product_variant_id);
                if ($variant) {
                    $this->move($variant, 'devolucion', $item->quantity, "Cancelación de venta {$sale->code}", $user, null, $sale);
                }
            }

            $sale->forceFill(['stock_deducted_at' => null])->saveQuietly();
        });
    }
}
