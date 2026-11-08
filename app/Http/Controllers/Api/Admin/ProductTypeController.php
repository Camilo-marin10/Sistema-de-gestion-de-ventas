<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveProductTypeRequest;
use App\Http\Resources\ProductTypeResource;
use App\Models\ProductType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * Tipos de producto (CRUD del administrador) + listado para los selects del catálogo.
 */
class ProductTypeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string', 'max:80'],
            'status' => ['nullable', Rule::in(['activo', 'inactivo'])],
        ]);

        $types = ProductType::query()
            ->withCount('products')
            ->when($validated['q'] ?? null, fn ($q, $term) => $q->where(fn ($w) => $w
                ->where('name', 'like', "%{$term}%")
                ->orWhere('description', 'like', "%{$term}%")))
            ->when($validated['status'] ?? null, fn ($q, $status) => $q->where('is_active', $status === 'activo'))
            ->orderBy('name')
            ->get();

        return ProductTypeResource::collection($types)
            ->additional(['summary' => [
                'total' => ProductType::count(),
                'active' => ProductType::active()->count(),
                'in_use' => ProductType::has('products')->count(),
            ]])
            ->response();
    }

    /**
     * Opciones para el select de productos: sólo tipos activos.
     * Si se edita un producto cuyo tipo fue desactivado, se incluye con ?include=ID.
     */
    public function options(Request $request): JsonResponse
    {
        $include = $request->integer('include') ?: null;

        $types = ProductType::query()
            ->where(fn ($q) => $q->where('is_active', true)->when($include, fn ($w) => $w->orWhere('id', $include)))
            ->orderBy('name')
            ->get(['id', 'name', 'is_active']);

        return response()->json(['data' => $types]);
    }

    public function store(SaveProductTypeRequest $request): JsonResponse
    {
        $type = ProductType::create($request->safe()->only(['name', 'description', 'is_active']));

        return (new ProductTypeResource($type->loadCount('products')))
            ->additional(['message' => 'Tipo de producto creado.'])
            ->response()
            ->setStatusCode(201);
    }

    public function update(SaveProductTypeRequest $request, ProductType $productType): JsonResponse
    {
        $productType->update($request->safe()->only(['name', 'description', 'is_active']));

        return (new ProductTypeResource($productType->loadCount('products')))
            ->additional(['message' => 'Tipo de producto actualizado.'])
            ->response();
    }

    public function destroy(ProductType $productType): JsonResponse
    {
        $count = $productType->products()->count();
        if ($count > 0) {
            return response()->json([
                'message' => "No se puede eliminar: {$count} producto(s) usan este tipo. Reasígnalos o desactiva el tipo para ocultarlo de los formularios.",
            ], 422);
        }

        $productType->delete();

        return response()->json(['message' => 'Tipo de producto eliminado.']);
    }
}
