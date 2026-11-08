<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\StockMovement;
use App\Services\InventoryService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

/**
 * Inventario: existencias por variante (talla/color), kardex de movimientos y ajustes manuales.
 */
class InventoryController extends Controller
{
    public function __construct(private readonly InventoryService $inventory)
    {
    }

    /** Existencias por variante. */
    public function index(Request $request): JsonResponse
    {
        $v = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'line' => ['nullable', Rule::in(Product::LINES)],
            'type' => ['nullable', 'integer'],
            'status' => ['nullable', Rule::in(['optimo', 'critico', 'agotado'])],
            'sort' => ['nullable', Rule::in(['stock_asc', 'stock_desc', 'producto'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ]);

        $variants = ProductVariant::query()
            ->select('product_variants.*')
            ->join('products', 'products.id', '=', 'product_variants.product_id')
            ->with(['product:id,name,sku,line,price,sale_price,stock_alert_threshold,image_path,product_type_id,status', 'product.type:id,name'])
            ->when($v['q'] ?? null, function (Builder $q, $term) {
                $like = "%{$term}%";
                $q->where(fn ($w) => $w->where('product_variants.sku', 'like', $like)
                    ->orWhere('products.name', 'like', $like)
                    ->orWhere('products.sku', 'like', $like));
            })
            ->when($v['line'] ?? null, fn ($q, $line) => $q->where('products.line', $line))
            ->when($v['type'] ?? null, fn ($q, $type) => $q->where('products.product_type_id', $type))
            ->when($v['status'] ?? null, fn ($q, $status) => match ($status) {
                'agotado' => $q->where('product_variants.stock', 0),
                'critico' => $q->where('product_variants.stock', '>', 0)->whereColumn('product_variants.stock', '<=', 'products.stock_alert_threshold'),
                'optimo' => $q->whereColumn('product_variants.stock', '>', 'products.stock_alert_threshold'),
            })
            ->when($v['sort'] ?? 'stock_asc', fn ($q, $sort) => match ($sort) {
                'stock_desc' => $q->orderByDesc('product_variants.stock'),
                'producto' => $q->orderBy('products.name')->orderBy('product_variants.id'),
                default => $q->orderBy('product_variants.stock')->orderBy('products.name'),
            })
            ->paginate($v['per_page'] ?? 10)
            ->withQueryString();

        $variants->getCollection()->transform(fn (ProductVariant $variant) => $this->variantPayload($variant));

        return response()->json([
            ...$variants->toArray(),
            'summary' => $this->summary(),
        ]);
    }

    /** Kardex: historial de movimientos. */
    public function movements(Request $request): JsonResponse
    {
        $v = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'type' => ['nullable', Rule::in(array_keys(StockMovement::TYPE_LABELS))],
            'variant' => ['nullable', 'integer'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ]);

        $movements = StockMovement::query()
            ->with(['user:id,name', 'sale:id,code'])
            ->when($v['q'] ?? null, fn ($q, $term) => $q->where(fn ($w) => $w->where('sku', 'like', "%{$term}%")->orWhere('product_name', 'like', "%{$term}%")))
            ->when($v['type'] ?? null, fn ($q, $type) => $q->where('type', $type))
            ->when($v['variant'] ?? null, fn ($q, $id) => $q->where('product_variant_id', $id))
            ->latest('id')
            ->paginate($v['per_page'] ?? 15)
            ->withQueryString();

        $movements->getCollection()->transform(fn (StockMovement $m) => $this->movementPayload($m));

        return response()->json($movements);
    }

    /** Registra una entrada, salida o ajuste manual. */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_variant_id' => ['required', 'integer', 'exists:product_variants,id'],
            'type' => ['required', Rule::in(array_keys(StockMovement::MANUAL_REASONS))],
            'quantity' => ['required', 'integer', 'min:0', 'max:100000'],
            'reason' => ['required', 'string', Rule::in(StockMovement::MANUAL_REASONS[$request->input('type')] ?? [])],
            'note' => ['nullable', 'string', 'max:500', Rule::requiredIf($request->input('reason') === 'Otro')],
        ], [
            'product_variant_id.required' => 'Selecciona la variante (SKU) a intervenir.',
            'product_variant_id.exists' => 'La variante seleccionada no existe.',
            'type.required' => 'Selecciona el tipo de movimiento.',
            'type.in' => 'Tipo de movimiento inválido.',
            'quantity.required' => 'Indica la cantidad.',
            'quantity.integer' => 'La cantidad debe ser un número entero.',
            'quantity.min' => 'La cantidad no puede ser negativa.',
            'reason.required' => 'Selecciona el motivo.',
            'reason.in' => 'Selecciona un motivo válido para este tipo de movimiento.',
            'note.required' => 'Describe el motivo en la nota cuando eliges "Otro".',
            'note.max' => 'La nota no puede superar 500 caracteres.',
        ]);

        $variant = ProductVariant::findOrFail($data['product_variant_id']);
        $movement = $this->inventory->move($variant, $data['type'], $data['quantity'], $data['reason'], $request->user(), $data['note'] ?? null);

        return response()->json([
            'message' => 'Movimiento registrado correctamente.',
            'movement' => $this->movementPayload($movement->load('user:id,name')),
            'variant' => $this->variantPayload($variant->fresh(['product.type'])),
        ], 201);
    }

    /** Motivos disponibles por tipo de movimiento manual. */
    public function reasons(): JsonResponse
    {
        return response()->json(['data' => StockMovement::MANUAL_REASONS]);
    }

    /** @return array<string, mixed> */
    private function variantPayload(ProductVariant $variant): array
    {
        $product = $variant->product;
        $threshold = (int) $product->stock_alert_threshold;
        $price = (float) ($product->sale_price ?? $product->price);

        return [
            'id' => $variant->id,
            'sku' => $variant->sku,
            'size' => $variant->size,
            'color' => $variant->color,
            'color_hex' => $variant->color_hex,
            'stock' => $variant->stock,
            'threshold' => $threshold,
            'stock_status' => $variant->stockStatus($threshold),
            'unit_price' => $price,
            'stock_value' => $price * $variant->stock,
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'sku' => $product->sku,
                'status' => $product->status,
                'line_label' => Product::LINE_LABELS[$product->line] ?? $product->line,
                'type' => $product->type?->name,
                'image_url' => $product->imageUrl(),
            ],
        ];
    }

    /** @return array<string, mixed> */
    private function movementPayload(StockMovement $m): array
    {
        return [
            'id' => $m->id,
            'type' => $m->type,
            'type_label' => StockMovement::TYPE_LABELS[$m->type] ?? $m->type,
            'product_variant_id' => $m->product_variant_id,
            'product_name' => $m->product_name,
            'sku' => $m->sku,
            'variant_label' => $m->variant_label,
            'quantity' => $m->quantity,
            'stock_before' => $m->stock_before,
            'stock_after' => $m->stock_after,
            'reason' => $m->reason,
            'note' => $m->note,
            'user' => $m->user?->name,
            'sale' => $m->sale?->code,
            'created_at' => $m->created_at?->toIso8601String(),
        ];
    }

    /** @return array<string, int|float> */
    private function summary(): array
    {
        $row = DB::table('product_variants')
            ->join('products', 'products.id', '=', 'product_variants.product_id')
            ->selectRaw('COALESCE(SUM(product_variants.stock), 0) AS units')
            ->selectRaw('COALESCE(SUM(product_variants.stock * COALESCE(products.sale_price, products.price)), 0) AS value')
            ->selectRaw('COUNT(*) AS variants')
            ->selectRaw('SUM(CASE WHEN product_variants.stock = 0 THEN 1 ELSE 0 END) AS out_of_stock')
            ->selectRaw('SUM(CASE WHEN product_variants.stock > 0 AND product_variants.stock <= products.stock_alert_threshold THEN 1 ELSE 0 END) AS critical')
            ->first();

        return [
            'units' => (int) $row->units,
            'value' => (float) $row->value,
            'variants' => (int) $row->variants,
            'out_of_stock' => (int) $row->out_of_stock,
            'critical' => (int) $row->critical,
            'movements_24h' => StockMovement::where('created_at', '>=', now()->subDay())->count(),
        ];
    }
}
