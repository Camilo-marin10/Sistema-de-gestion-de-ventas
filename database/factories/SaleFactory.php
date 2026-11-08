<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sale>
 */
class SaleFactory extends Factory
{
    private const CATALOG = [
        ['Camiseta Oversize Heavyweight', 'ASC-TS-092', 125000, ['M', 'L', 'XL'], ['Negro', 'Gris']],
        ['Body Asimétrico Esculpido Nexus', 'ASC-BD-104', 160000, ['XS', 'S', 'M'], ['Negro', 'Blanco']],
        ['Corset Estructurado Siren', 'ASC-CR-045', 189000, ['XS', 'S', 'M'], ['Rojo Carmín', 'Negro']],
        ['Hoodie Oversize Raw Edge', 'ASC-HD-012', 240000, ['M', 'L'], ['Gris', 'Negro']],
        ['Tenis Ascend Track', 'ASC-TN-880', 380000, ['38', '40', '41'], ['Blanco']],
        ['Crop Top Vortex', 'ASC-TS-310', 95000, ['S', 'M'], ['Blanco', 'Negro']],
    ];

    public function definition(): array
    {
        return [
            'code' => 'ASC-'.fake()->unique()->numberBetween(1000, 99999),
            'channel' => fake()->randomElement(array_keys(Sale::CHANNEL_LABELS)),
            'status' => fake()->randomElement(['confirmado', 'preparacion', 'enviado', 'entregado', 'entregado', 'pendiente', 'cancelado']),
            'subtotal' => 0,
            'discount' => 0,
            'total' => 0,
            'created_at' => fake()->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /** Agrega 1–3 prendas y recalcula los totales. */
    public function configure(): static
    {
        return $this->afterCreating(function (Sale $sale) {
            if ($sale->items()->exists()) {
                return;
            }
            $subtotal = 0;
            foreach (fake()->randomElements(self::CATALOG, fake()->numberBetween(1, 3)) as [$name, $sku, $price, $sizes, $colors]) {
                $qty = fake()->numberBetween(1, 2);
                $subtotal += $qty * $price;
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_name' => $name,
                    'sku' => $sku,
                    'size' => fake()->randomElement($sizes),
                    'color' => fake()->randomElement($colors),
                    'quantity' => $qty,
                    'unit_price' => $price,
                    'line_total' => $qty * $price,
                ]);
            }
            $discount = fake()->boolean(30) ? round($subtotal * 0.10) : 0;
            $sale->update([
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $subtotal - $discount,
                'coupon_code' => $discount ? 'ASCENDVIP' : null,
                'confirmed_at' => $sale->status === 'pendiente' ? null : $sale->created_at,
            ]);
        });
    }
}
