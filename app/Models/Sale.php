<?php

namespace App\Models;

use Database\Factories\SaleFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Venta. Para cambiar su estado usa InventoryService::changeSaleStatus(), que descuenta
 * o repone el stock en la misma transacción.
 */
class Sale extends Model
{
    /** @use HasFactory<SaleFactory> */
    use HasFactory;

    public const STATUS_LABELS = [
        'pendiente' => 'Pendiente',
        'confirmado' => 'Confirmado',
        'preparacion' => 'En preparación',
        'enviado' => 'Enviado',
        'entregado' => 'Entregado',
        'cancelado' => 'Cancelado',
    ];

    public const CHANNEL_LABELS = [
        'web' => 'Web Directa',
        'whatsapp' => 'WhatsApp',
        'instagram' => 'Instagram',
        'tiktok' => 'TikTok',
        'tienda' => 'Tienda física',
    ];

    protected $fillable = [
        'code', 'customer_id', 'seller_id', 'channel', 'status',
        'subtotal', 'discount', 'total', 'coupon_code', 'notes', 'confirmed_at', 'stock_deducted_at',
    ];

    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'discount' => 'decimal:2',
            'total' => 'decimal:2',
            'confirmed_at' => 'datetime',
            'stock_deducted_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    /** Ventas que cuentan como ingreso (todas excepto las canceladas). */
    public function scopeEffective(Builder $query): Builder
    {
        return $query->where('status', '!=', 'cancelado');
    }
}
