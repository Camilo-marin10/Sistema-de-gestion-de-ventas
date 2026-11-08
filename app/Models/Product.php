<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    public const LINES = ['hombre', 'mujer', 'unisex'];
    public const STATUSES = ['activo', 'borrador', 'inactivo'];

    public const LINE_LABELS = ['hombre' => 'Hombre', 'mujer' => 'Mujer', 'unisex' => 'Unisex'];
    public const STATUS_LABELS = ['activo' => 'Activo', 'borrador' => 'Borrador', 'inactivo' => 'Inactivo'];

    /** Disco donde se guardan las imágenes (public/uploads). */
    public const IMAGE_DISK = 'uploads';

    protected $fillable = [
        'product_type_id', 'name', 'sku', 'line', 'description', 'price', 'sale_price',
        'stock_alert_threshold', 'status', 'is_featured', 'tags',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'stock_alert_threshold' => 'integer',
            'is_featured' => 'boolean',
            'tags' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            $product->sku = Str::upper(trim($product->sku));
            if ($product->isDirty('name') || ! $product->slug) {
                $product->slug = static::uniqueSlug($product->name, $product->id);
            }
        });

        // Al eliminar el producto se borra también su imagen.
        static::deleted(function (Product $product) {
            if ($product->image_path) {
                Storage::disk(self::IMAGE_DISK)->delete($product->image_path);
            }
        });
    }

    public static function uniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name) ?: 'producto';
        $slug = $base;
        $i = 2;
        while (static::where('slug', $slug)->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class)->orderBy('id');
    }

    public function saleItems(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    /** Agrega `variants_sum_stock` y `variants_count` a la consulta. */
    public function scopeWithStock(Builder $query): Builder
    {
        return $query->withSum('variants', 'stock')->withCount('variants');
    }

    public function totalStock(): int
    {
        return (int) ($this->variants_sum_stock ?? $this->variants->sum('stock'));
    }

    /** agotado | critico | optimo */
    public function stockStatus(): string
    {
        $stock = $this->totalStock();

        return match (true) {
            $stock === 0 => 'agotado',
            $stock <= $this->stock_alert_threshold => 'critico',
            default => 'optimo',
        };
    }

    public function imageUrl(): ?string
    {
        return $this->image_path ? '/uploads/'.$this->image_path : null;
    }
}
