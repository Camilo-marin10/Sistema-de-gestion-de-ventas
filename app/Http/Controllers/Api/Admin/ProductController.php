<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\InventoryService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * Catálogo de productos del administrador (con variantes de talla/color e imagen).
 */
class ProductController extends Controller
{
    public function __construct(private readonly InventoryService $inventory)
    {
    }

    /** Stock total del producto (suma de sus variantes) como subconsulta SQL. */
    private const STOCK_SQL = '(select coalesce(sum(stock), 0) from product_variants where product_variants.product_id = products.id)';

    public function index(Request $request): JsonResponse
    {
        $v = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'line' => ['nullable', Rule::in(Product::LINES)],
            'type' => ['nullable', 'integer'],
            'status' => ['nullable', Rule::in([...Product::STATUSES, 'agotado', 'critico'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ]);

        $products = Product::query()
            ->with(['type:id,name,is_active', 'variants'])
            ->withStock()
            ->when($v['q'] ?? null, function (Builder $q, $term) {
                $like = "%{$term}%";
                $q->where(fn ($w) => $w->where('name', 'like', $like)
                    ->orWhere('sku', 'like', $like)
                    ->orWhereHas('variants', fn ($vq) => $vq->where('sku', 'like', $like)));
            })
            ->when($v['line'] ?? null, fn ($q, $line) => $q->where('line', $line))
            ->when($v['type'] ?? null, fn ($q, $type) => $q->where('product_type_id', $type))
            ->when($v['status'] ?? null, fn ($q, $status) => match ($status) {
                'agotado' => $q->whereRaw(self::STOCK_SQL.' = 0'),
                'critico' => $q->whereRaw(self::STOCK_SQL.' > 0')->whereRaw(self::STOCK_SQL.' <= stock_alert_threshold'),
                default => $q->where('status', $status),
            })
            ->latest('id')
            ->paginate($v['per_page'] ?? 10)
            ->withQueryString();

        return ProductResource::collection($products)
            ->additional(['summary' => $this->summary()])
            ->response();
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load(['type:id,name,is_active', 'variants'])->loadSum('variants', 'stock')->loadCount('variants'));
    }

    public function store(SaveProductRequest $request): JsonResponse
    {
        $product = DB::transaction(function () use ($request) {
            $product = Product::create($request->safe()->except('variants'));
            $this->syncVariants($product, $request->validated('variants'), $request->user());

            return $product;
        });

        return $this->respond($product, 'Producto creado correctamente.', 201);
    }

    public function update(SaveProductRequest $request, Product $product): JsonResponse
    {
        DB::transaction(function () use ($request, $product) {
            $product->update($request->safe()->except('variants'));
            $this->syncVariants($product, $request->validated('variants'), $request->user());
        });

        return $this->respond($product, 'Producto actualizado correctamente.');
    }

    public function destroy(Request $request, Product $product): JsonResponse
    {
        // Las ventas y los movimientos guardan una copia (nombre, SKU, precio) de cada prenda,
        // así que el historial se conserva aunque el producto se elimine.
        DB::transaction(function () use ($request, $product) {
            foreach ($product->variants()->where('stock', '>', 0)->get() as $variant) {
                $this->inventory->move($variant, 'salida', $variant->stock, 'Producto eliminado del catálogo', $request->user());
            }
            $product->delete();
        });

        return response()->json(['message' => 'Producto eliminado correctamente.']);
    }

    /** Marca / desmarca el producto como destacado (switch de la tabla). */
    public function featured(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate(['is_featured' => ['required', 'boolean']]);
        $product->update($data);

        return $this->respond($product, $product->is_featured ? 'Producto destacado.' : 'Producto quitado de destacados.');
    }

    public function uploadImage(Request $request, Product $product): JsonResponse
    {
        $request->validate(
            ['image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096']],
            [
                'image.required' => 'Selecciona una imagen.',
                'image.image' => 'El archivo debe ser una imagen.',
                'image.mimes' => 'Formatos permitidos: JPG, PNG o WEBP.',
                'image.max' => 'La imagen no puede superar 4 MB.',
            ],
        );

        $disk = Storage::disk(Product::IMAGE_DISK);
        $old = $product->image_path;
        $path = $request->file('image')->storeAs(
            'products',
            $product->id.'-'.Str::random(8).'.'.$request->file('image')->extension(),
            Product::IMAGE_DISK,
        );

        $product->forceFill(['image_path' => $path])->save();
        if ($old) {
            $disk->delete($old);
        }

        return $this->respond($product, 'Imagen actualizada.');
    }

    public function deleteImage(Product $product): JsonResponse
    {
        if ($product->image_path) {
            Storage::disk(Product::IMAGE_DISK)->delete($product->image_path);
            $product->forceFill(['image_path' => null])->save();
        }

        return $this->respond($product, 'Imagen eliminada.');
    }

    /**
     * Actualiza las variantes existentes (por id), crea las nuevas y elimina las que se quitaron.
     *
     * @param  array<int, array<string, mixed>>  $variants
     */
    private function syncVariants(Product $product, array $variants, ?\App\Models\User $user = null): void
    {
        $existing = $product->variants()->get()->keyBy('id');

        foreach ($variants as $i => $data) {
            if (! empty($data['id']) && ! $existing->has($data['id'])) {
                throw ValidationException::withMessages(["variants.{$i}.id" => 'La variante no pertenece a este producto.']);
            }
        }

        $keep = collect($variants)->pluck('id')->filter()->all();

        // Las variantes que se quitan dejan constancia de su stock en el kardex antes de eliminarse.
        foreach ($existing->except($keep) as $removed) {
            if ($removed->stock > 0) {
                $this->inventory->move($removed, 'salida', $removed->stock, 'Variante eliminada del producto', $user);
            }
            $removed->delete();
        }

        // Liberar temporalmente SKUs/combinaciones para permitir intercambios entre variantes del mismo producto.
        foreach ($existing->only($keep) as $variant) {
            $variant->update(['sku' => 'TMP-'.$variant->id.'-'.Str::random(6), 'size' => 'TMP'.$variant->id]);
        }

        foreach ($variants as $data) {
            // El stock de variantes existentes sólo cambia desde Inventario (con movimiento registrado).
            $attributes = collect($data)->only(['size', 'color', 'color_hex', 'sku'])->all();
            if (! empty($data['id'])) {
                $existing[$data['id']]->update($attributes);
                continue;
            }

            $variant = $product->variants()->create([...$attributes, 'stock' => 0]);
            if (($data['stock'] ?? 0) > 0) {
                $this->inventory->move($variant, 'inicial', (int) $data['stock'], 'Stock inicial al crear la variante', $user);
            }
        }
    }

    private function respond(Product $product, string $message, int $status = 200): JsonResponse
    {
        $product->load(['type:id,name,is_active', 'variants'])->loadSum('variants', 'stock')->loadCount('variants');

        return (new ProductResource($product))
            ->additional(['message' => $message])
            ->response()
            ->setStatusCode($status);
    }

    /** @return array<string, int> */
    private function summary(): array
    {
        $stocks = Product::query()->withSum('variants', 'stock')->get(['id', 'stock_alert_threshold', 'status']);

        return [
            'total' => $stocks->count(),
            'active' => $stocks->where('status', 'activo')->count(),
            'drafts' => $stocks->where('status', 'borrador')->count(),
            'inactive' => $stocks->where('status', 'inactivo')->count(),
            'critical' => $stocks->filter(fn ($p) => $p->variants_sum_stock > 0 && $p->variants_sum_stock <= $p->stock_alert_threshold)->count(),
            'out_of_stock' => $stocks->filter(fn ($p) => (int) $p->variants_sum_stock === 0)->count(),
            'units' => (int) $stocks->sum('variants_sum_stock'),
            'skus' => (int) DB::table('product_variants')->count(),
        ];
    }
}
