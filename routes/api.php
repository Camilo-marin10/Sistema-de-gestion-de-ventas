<?php

use App\Http\Controllers\Api\Admin\InventoryController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\ProductTypeController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\StockMovementController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Autenticación
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:10,1');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:20,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

/*
|--------------------------------------------------------------------------
| Panel de administración (sólo rol admin)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('users/{user}/history', [AdminUserController::class, 'history']);
    Route::apiResource('users', AdminUserController::class);

    Route::apiResource('product-types', ProductTypeController::class)
        ->except('show')
        ->parameters(['product-types' => 'productType']);

    Route::patch('products/{product}/featured', [AdminProductController::class, 'featured']);
    Route::post('products/{product}/image', [AdminProductController::class, 'uploadImage']);
    Route::delete('products/{product}/image', [AdminProductController::class, 'deleteImage']);
    Route::apiResource('products', AdminProductController::class)->names('admin.products');

    Route::prefix('inventory')->group(function () {
        Route::get('/', [InventoryController::class, 'index']);
        Route::get('movements', [InventoryController::class, 'movements']);
        Route::post('movements', [InventoryController::class, 'store']);
        Route::get('reasons', [InventoryController::class, 'reasons']);
    });
});

/*
|--------------------------------------------------------------------------
| Catálogo interno (admin y vendedor): opciones para formularios
|--------------------------------------------------------------------------
*/
Route::prefix('catalog')->middleware(['auth:sanctum', 'role:admin,vendedor'])->group(function () {
    Route::get('product-types', [ProductTypeController::class, 'options']);
});

/*
|--------------------------------------------------------------------------
| Recursos de negocio (pendientes de implementar)
|--------------------------------------------------------------------------
*/
Route::apiResource('products', ProductController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('sales', SaleController::class);
Route::apiResource('stock-movements', StockMovementController::class);
