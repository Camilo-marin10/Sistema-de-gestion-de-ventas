<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Product */
class ProductResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $price = (float) $this->price;
        $salePrice = $this->sale_price !== null ? (float) $this->sale_price : null;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'line' => $this->line,
            'line_label' => Product::LINE_LABELS[$this->line] ?? $this->line,
            'type' => $this->whenLoaded('type', fn () => $this->type ? [
                'id' => $this->type->id,
                'name' => $this->type->name,
                'is_active' => (bool) $this->type->is_active,
            ] : null),
            'product_type_id' => $this->product_type_id,
            'description' => $this->description,
            'price' => $price,
            'sale_price' => $salePrice,
            'effective_price' => $salePrice ?? $price,
            'discount_percent' => $salePrice ? (int) round((1 - $salePrice / max($price, 1)) * 100) : null,
            'stock_alert_threshold' => $this->stock_alert_threshold,
            'status' => $this->status,
            'status_label' => Product::STATUS_LABELS[$this->status] ?? $this->status,
            'is_featured' => (bool) $this->is_featured,
            'tags' => $this->tags ?? [],
            'image_url' => $this->imageUrl(),
            'total_stock' => $this->totalStock(),
            'stock_status' => $this->stockStatus(),
            'variants_count' => $this->variants_count ?? $this->variants->count(),
            'variants' => $this->whenLoaded('variants', fn () => $this->variants->map(fn ($v) => [
                'id' => $v->id,
                'size' => $v->size,
                'color' => $v->color,
                'color_hex' => $v->color_hex,
                'sku' => $v->sku,
                'stock' => $v->stock,
            ])),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
