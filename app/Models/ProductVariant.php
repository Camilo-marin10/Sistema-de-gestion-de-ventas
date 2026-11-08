<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class ProductVariant extends Model
{
    protected $fillable = ['product_id', 'size', 'color', 'color_hex', 'sku', 'stock'];

    protected function casts(): array
    {
        return ['stock' => 'integer'];
    }

    protected static function booted(): void
    {
        static::saving(function (ProductVariant $variant) {
            $variant->sku = Str::upper(trim($variant->sku));
            $variant->size = Str::upper(trim($variant->size));
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function movements(): HasMany
    {
        return $this->hasMany(StockMovement::class);
    }

    /** agotado | critico | optimo, según el umbral del producto. */
    public function stockStatus(?int $threshold = null): string
    {
        $threshold ??= $this->product?->stock_alert_threshold ?? 0;

        return match (true) {
            $this->stock === 0 => 'agotado',
            $this->stock <= $threshold => 'critico',
            default => 'optimo',
        };
    }
}
