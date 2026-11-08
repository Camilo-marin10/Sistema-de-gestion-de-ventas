<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Movimiento de inventario (kardex). Es un registro inmutable: no se edita ni se elimina.
 */
class StockMovement extends Model
{
    public const TYPE_LABELS = [
        'inicial' => 'Stock inicial',
        'entrada' => 'Entrada',
        'salida' => 'Salida',
        'ajuste' => 'Ajuste',
        'venta' => 'Venta',
        'devolucion' => 'Devolución',
    ];

    /** Motivos permitidos para los movimientos manuales. */
    public const MANUAL_REASONS = [
        'entrada' => ['Compra a proveedor', 'Reposición de taller / maquila', 'Devolución de cliente', 'Traslado desde otra bodega', 'Otro'],
        'salida' => ['Prenda defectuosa', 'Merma o pérdida', 'Muestra / uso interno', 'Traslado a otra bodega', 'Otro'],
        'ajuste' => ['Conteo físico / auditoría', 'Corrección de error de registro', 'Otro'],
    ];

    protected $fillable = [
        'product_variant_id', 'product_name', 'sku', 'variant_label', 'type', 'quantity',
        'stock_before', 'stock_after', 'reason', 'note', 'user_id', 'sale_id',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'stock_before' => 'integer',
            'stock_after' => 'integer',
        ];
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }
}
