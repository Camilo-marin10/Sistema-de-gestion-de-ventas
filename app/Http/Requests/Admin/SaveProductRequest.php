<?php

namespace App\Http\Requests\Admin;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

/**
 * Crear / editar un producto con su matriz de variantes (talla, color, SKU, stock).
 */
class SaveProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->hasRole(User::ROLE_ADMIN);
    }

    protected function prepareForValidation(): void
    {
        $variants = collect($this->input('variants', []))->map(fn ($v) => [
            'id' => $v['id'] ?? null,
            'size' => Str::upper(trim((string) ($v['size'] ?? ''))),
            'color' => preg_replace('/\s+/', ' ', trim((string) ($v['color'] ?? ''))),
            'color_hex' => ! empty($v['color_hex']) ? Str::lower($v['color_hex']) : null,
            'sku' => Str::upper(trim((string) ($v['sku'] ?? ''))),
            'stock' => $v['stock'] ?? null,
        ])->values()->all();

        $this->merge([
            'name' => preg_replace('/\s+/', ' ', trim((string) $this->input('name'))),
            'sku' => Str::upper(trim((string) $this->input('sku'))),
            'description' => $this->filled('description') ? trim((string) $this->input('description')) : null,
            'sale_price' => $this->filled('sale_price') ? $this->input('sale_price') : null,
            'tags' => array_values(array_unique(array_filter(array_map('trim', (array) $this->input('tags', []))))),
            'is_featured' => $this->boolean('is_featured'),
            'variants' => $variants,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var Product|null $product */
        $product = $this->route('product');

        return [
            'product_type_id' => [
                'required', 'integer',
                // Debe ser un tipo activo (o el que ya tenía el producto, aunque se haya desactivado).
                Rule::exists('product_types', 'id')->where(fn ($q) => $q->where('is_active', true)
                    ->when($product?->product_type_id, fn ($w, $current) => $w->orWhere('id', $current))),
            ],
            'name' => ['required', 'string', 'min:3', 'max:150'],
            'sku' => ['required', 'string', 'max:40', 'regex:/^[A-Z0-9-]+$/', Rule::unique('products', 'sku')->ignore($product)],
            'line' => ['required', Rule::in(Product::LINES)],
            'description' => ['nullable', 'string', 'max:5000'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999999'],
            'sale_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            'stock_alert_threshold' => ['required', 'integer', 'min:0', 'max:1000'],
            'status' => ['required', Rule::in(Product::STATUSES)],
            'is_featured' => ['boolean'],
            'tags' => ['array', 'max:8'],
            'tags.*' => ['string', 'max:30'],

            'variants' => ['required', 'array', 'min:1', 'max:100'],
            'variants.*.id' => ['nullable', 'integer'],
            'variants.*.size' => ['required', 'string', 'max:20'],
            'variants.*.color' => ['required', 'string', 'max:40'],
            'variants.*.color_hex' => ['nullable', 'regex:/^#[0-9a-f]{6}$/'],
            'variants.*.sku' => [
                'required', 'string', 'max:60', 'regex:/^[A-Z0-9-]+$/', 'distinct',
                Rule::unique('product_variants', 'sku')->when($product, fn ($rule) => $rule->where(fn ($q) => $q->where('product_id', '!=', $product->id))),
            ],
            // Sólo las variantes nuevas definen stock (inicial); el de las existentes se gestiona en Inventario.
            'variants.*.stock' => ['nullable', 'required_without:variants.*.id', 'integer', 'min:0', 'max:100000'],
        ];
    }

    /** No se permite repetir la combinación talla + color. */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v) {
            $seen = [];
            foreach ($this->input('variants', []) as $i => $variant) {
                $key = $variant['size'].'|'.mb_strtolower($variant['color']);
                if ($variant['size'] !== '' && $variant['color'] !== '' && isset($seen[$key])) {
                    $v->errors()->add("variants.{$i}.color", "La combinación {$variant['size']} / {$variant['color']} está repetida.");
                }
                $seen[$key] = true;
            }
        });
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'product_type_id.required' => 'Selecciona el tipo de producto.',
            'product_type_id.exists' => 'El tipo de producto seleccionado no existe o está inactivo.',
            'name.required' => 'Escribe el nombre del producto.',
            'name.min' => 'El nombre debe tener al menos 3 caracteres.',
            'sku.required' => 'Escribe el SKU base.',
            'sku.regex' => 'El SKU sólo puede tener letras, números y guiones.',
            'sku.unique' => 'Ya existe un producto con este SKU.',
            'line.in' => 'Selecciona una línea válida.',
            'price.required' => 'Escribe el precio regular.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio no puede ser negativo.',
            'sale_price.lt' => 'El precio promocional debe ser menor al precio regular.',
            'sale_price.min' => 'El precio promocional no puede ser negativo.',
            'stock_alert_threshold.required' => 'Define el umbral de stock crítico.',
            'stock_alert_threshold.min' => 'El umbral no puede ser negativo.',
            'status.in' => 'Selecciona un estado válido.',
            'tags.max' => 'Máximo 8 etiquetas.',
            'variants.required' => 'Agrega al menos una variante (talla y color).',
            'variants.min' => 'Agrega al menos una variante (talla y color).',
            'variants.*.size.required' => 'Indica la talla.',
            'variants.*.color.required' => 'Indica el color.',
            'variants.*.color_hex.regex' => 'Color inválido.',
            'variants.*.sku.required' => 'Indica el SKU de la variante.',
            'variants.*.sku.regex' => 'Sólo letras, números y guiones.',
            'variants.*.sku.distinct' => 'SKU repetido en otra variante.',
            'variants.*.sku.unique' => 'Este SKU ya lo usa otro producto.',
            'variants.*.stock.required_without' => 'Indica el stock inicial.',
            'variants.*.stock.integer' => 'El stock debe ser un número entero.',
            'variants.*.stock.min' => 'El stock no puede ser negativo.',
        ];
    }
}
