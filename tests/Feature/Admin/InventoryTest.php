<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\ProductVariant;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use App\Models\User;
use App\Services\InventoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class InventoryTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->admin()->create(['name' => 'Camilo Marin']);
        ProductType::create(['name' => 'Corsets']);
    }

    /** Crea un producto por la API (registra el stock inicial como movimiento). */
    private function createProduct(array $variants = [['S', 'Rojo', 'COR-S-ROJ', 4], ['M', 'Negro', 'COR-M-NEG', 10]], int $threshold = 3): array
    {
        Sanctum::actingAs($this->admin);

        return $this->postJson('/api/admin/products', [
            'product_type_id' => ProductType::first()->id,
            'name' => 'Corset Siren',
            'sku' => 'COR',
            'line' => 'mujer',
            'price' => 189000,
            'sale_price' => 169000,
            'stock_alert_threshold' => $threshold,
            'status' => 'activo',
            'variants' => array_map(fn ($v) => ['size' => $v[0], 'color' => $v[1], 'sku' => $v[2], 'stock' => $v[3]], $variants),
        ])->assertCreated()->json('data');
    }

    private function variant(string $sku): ProductVariant
    {
        return ProductVariant::where('sku', $sku)->firstOrFail();
    }

    public function test_only_admins_access_inventory(): void
    {
        $this->getJson('/api/admin/inventory')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->vendedor()->create());
        $this->getJson('/api/admin/inventory')->assertForbidden();
        $this->postJson('/api/admin/inventory/movements', [])->assertForbidden();
    }

    public function test_creating_a_product_registers_initial_stock_movements(): void
    {
        $this->createProduct();

        $this->assertSame(2, StockMovement::where('type', 'inicial')->count());
        $this->assertDatabaseHas('stock_movements', ['sku' => 'COR-S-ROJ', 'quantity' => 4, 'stock_before' => 0, 'stock_after' => 4, 'user_id' => $this->admin->id]);
    }

    public function test_inventory_lists_variants_with_status_and_summary(): void
    {
        $this->createProduct([['S', 'Rojo', 'COR-S-ROJ', 2], ['M', 'Negro', 'COR-M-NEG', 10], ['L', 'Blanco', 'COR-L-BLA', 0]]);

        $res = $this->getJson('/api/admin/inventory')->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.sku', 'COR-L-BLA') // ordenado por menor stock
            ->assertJsonPath('data.0.stock_status', 'agotado')
            ->assertJsonPath('data.1.stock_status', 'critico')
            ->assertJsonPath('data.2.stock_status', 'optimo')
            ->assertJsonPath('summary.units', 12)
            ->assertJsonPath('summary.critical', 1)
            ->assertJsonPath('summary.out_of_stock', 1);
        $this->assertEquals(12 * 169000, $res->json('summary.value'));

        $this->getJson('/api/admin/inventory?status=critico')->assertJsonCount(1, 'data')->assertJsonPath('data.0.sku', 'COR-S-ROJ');
        $this->getJson('/api/admin/inventory?q=M-NEG')->assertJsonCount(1, 'data');
    }

    public function test_manual_entry_exit_and_adjustment(): void
    {
        $this->createProduct();
        $id = $this->variant('COR-S-ROJ')->id;

        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'entrada', 'quantity' => 6, 'reason' => 'Compra a proveedor'])
            ->assertCreated()->assertJsonPath('variant.stock', 10)->assertJsonPath('movement.quantity', 6)->assertJsonPath('movement.user', 'Camilo Marin');

        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'salida', 'quantity' => 3, 'reason' => 'Prenda defectuosa'])
            ->assertCreated()->assertJsonPath('variant.stock', 7)->assertJsonPath('movement.quantity', -3);

        // Ajuste: la cantidad es el nuevo saldo absoluto
        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'ajuste', 'quantity' => 5, 'reason' => 'Conteo físico / auditoría'])
            ->assertCreated()->assertJsonPath('variant.stock', 5)->assertJsonPath('movement.quantity', -2)->assertJsonPath('movement.stock_before', 7);

        $this->getJson('/api/admin/inventory/movements?q=COR-S-ROJ')->assertJsonCount(4, 'data')->assertJsonPath('data.0.type', 'ajuste');
    }

    public function test_stock_can_never_go_negative(): void
    {
        $this->createProduct();
        $id = $this->variant('COR-S-ROJ')->id;

        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'salida', 'quantity' => 5, 'reason' => 'Merma o pérdida'])
            ->assertUnprocessable()->assertJsonValidationErrors('quantity');

        $this->assertSame(4, $this->variant('COR-S-ROJ')->stock);
    }

    public function test_movement_validation(): void
    {
        $this->createProduct();
        $id = $this->variant('COR-S-ROJ')->id;

        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => 999, 'type' => 'venta', 'quantity' => -1, 'reason' => 'x'])
            ->assertJsonValidationErrors(['product_variant_id', 'type', 'quantity', 'reason']);
        // Motivo de salida no válido para una entrada
        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'entrada', 'quantity' => 1, 'reason' => 'Prenda defectuosa'])
            ->assertJsonValidationErrors('reason');
        // "Otro" exige nota
        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'entrada', 'quantity' => 1, 'reason' => 'Otro'])
            ->assertJsonValidationErrors('note');
        // Entrada de 0 unidades
        $this->postJson('/api/admin/inventory/movements', ['product_variant_id' => $id, 'type' => 'entrada', 'quantity' => 0, 'reason' => 'Compra a proveedor'])
            ->assertJsonValidationErrors('quantity');
    }

    public function test_history_survives_product_deletion(): void
    {
        $product = $this->createProduct();

        $this->deleteJson("/api/admin/products/{$product['id']}")->assertOk();

        // Las unidades que había quedan registradas como salida y el kardex conserva el SKU.
        $this->assertDatabaseHas('stock_movements', ['sku' => 'COR-M-NEG', 'type' => 'salida', 'quantity' => -10, 'reason' => 'Producto eliminado del catálogo', 'product_variant_id' => null]);
        $this->assertSame(4, StockMovement::whereNull('product_variant_id')->count());
    }

    private function makeSale(array $lines, string $status = 'pendiente'): Sale
    {
        $sale = Sale::create(['code' => 'ASC-'.random_int(1000, 9999), 'status' => $status, 'total' => 0]);
        foreach ($lines as [$sku, $qty]) {
            $variant = $this->variant($sku);
            SaleItem::create([
                'sale_id' => $sale->id, 'product_id' => $variant->product_id, 'product_variant_id' => $variant->id,
                'product_name' => 'Corset Siren', 'sku' => $sku, 'quantity' => $qty, 'unit_price' => 169000, 'line_total' => 169000 * $qty,
            ]);
        }

        return $sale;
    }

    public function test_confirming_a_sale_deducts_stock_and_cancelling_restores_it(): void
    {
        $this->createProduct();
        $service = app(InventoryService::class);
        $sale = $this->makeSale([['COR-S-ROJ', 2], ['COR-M-NEG', 3]]);

        $service->changeSaleStatus($sale, 'confirmado', $this->admin);
        $this->assertSame(2, $this->variant('COR-S-ROJ')->stock);
        $this->assertSame(7, $this->variant('COR-M-NEG')->stock);
        $this->assertNotNull($sale->fresh()->stock_deducted_at);
        $this->assertDatabaseHas('stock_movements', ['sku' => 'COR-S-ROJ', 'type' => 'venta', 'quantity' => -2, 'sale_id' => $sale->id, 'reason' => "Venta {$sale->code}"]);

        // Avanzar de estado no vuelve a descontar (idempotente)
        $service->changeSaleStatus($sale, 'enviado', $this->admin);
        $service->changeSaleStatus($sale, 'entregado', $this->admin);
        $this->assertSame(2, $this->variant('COR-S-ROJ')->stock);

        // Cancelar repone las unidades
        $service->changeSaleStatus($sale, 'cancelado', $this->admin);
        $this->assertSame(4, $this->variant('COR-S-ROJ')->stock);
        $this->assertSame(10, $this->variant('COR-M-NEG')->stock);
        $this->assertNull($sale->fresh()->stock_deducted_at);
        $this->assertSame(2, StockMovement::where('type', 'devolucion')->count());
    }

    public function test_sale_without_enough_stock_cannot_be_confirmed(): void
    {
        $this->createProduct();
        $service = app(InventoryService::class);
        $sale = $this->makeSale([['COR-S-ROJ', 1], ['COR-M-NEG', 11]]); // M-NEG sólo tiene 10

        try {
            $service->changeSaleStatus($sale, 'confirmado', $this->admin);
            $this->fail('Debió rechazar la confirmación por falta de stock.');
        } catch (ValidationException $e) {
            $this->assertStringContainsString('COR-M-NEG', $e->errors()['stock'][0]);
        }

        // Todo o nada: no se descontó ninguna prenda y la venta sigue pendiente.
        $this->assertSame(4, $this->variant('COR-S-ROJ')->stock);
        $this->assertSame(10, $this->variant('COR-M-NEG')->stock);
        $this->assertSame('pendiente', $sale->fresh()->status);
        $this->assertSame(0, StockMovement::where('type', 'venta')->count());
    }

    public function test_cancelling_a_pending_sale_does_not_touch_stock(): void
    {
        $this->createProduct();
        $sale = $this->makeSale([['COR-S-ROJ', 2]]);

        app(InventoryService::class)->changeSaleStatus($sale, 'cancelado', $this->admin);

        $this->assertSame(4, $this->variant('COR-S-ROJ')->stock);
        $this->assertSame(0, StockMovement::whereIn('type', ['venta', 'devolucion'])->count());
    }
}
