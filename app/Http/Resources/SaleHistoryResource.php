<?php

namespace App\Http\Resources;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Venta dentro del historial de un usuario (compras de un cliente o ventas de un empleado).
 *
 * @mixin \App\Models\Sale
 */
class SaleHistoryResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'status' => $this->status,
            'status_label' => Sale::STATUS_LABELS[$this->status] ?? $this->status,
            'channel' => $this->channel,
            'channel_label' => Sale::CHANNEL_LABELS[$this->channel] ?? $this->channel,
            'subtotal' => (float) $this->subtotal,
            'discount' => (float) $this->discount,
            'total' => (float) $this->total,
            'coupon_code' => $this->coupon_code,
            'created_at' => $this->created_at?->toIso8601String(),
            'customer' => $this->whenLoaded('customer', fn () => $this->customer ? ['id' => $this->customer->id, 'name' => $this->customer->name] : null),
            'seller' => $this->whenLoaded('seller', fn () => $this->seller ? ['id' => $this->seller->id, 'name' => $this->seller->name] : null),
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($item) => [
                'id' => $item->id,
                'product_name' => $item->product_name,
                'sku' => $item->sku,
                'size' => $item->size,
                'color' => $item->color,
                'quantity' => $item->quantity,
                'unit_price' => (float) $item->unit_price,
                'line_total' => (float) $item->line_total,
            ])),
        ];
    }
}
