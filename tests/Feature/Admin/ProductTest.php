<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    private ProductType $type;

    protected function setUp(): void
    {
        parent::setUp();
        $this->type = ProductType::create(['name' => 'Camisetas oversize']);
    }

    private function asAdmin(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
    }

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'product_type_id' => $this->type->id,
            'name' => 'Camiseta Boxy Archive 92',
            'sku' => 'asc-ts-092',
            'line' => 'hombre',
            'description' => 'Algodón 280 GSM.',
            'price' => 145000,
            'sale_price' => 125000,
            'stock_alert_threshold' => 5,
            'status' => 'activo',
            'is_featured' => true,
            'tags' => ['Novedades', 'Colección 2025'],
            'variants' => [
                ['size' => 'm', 'color' => 'Negro', 'color_hex' => '#111111', 'sku' => 'ASC-TS-092-M-NEG', 'stock' => 10],
                ['size' => 'L', 'color' => 'Blanco', 'color_hex' => '#FFFFFF', 'sku' => 'ASC-TS-092-L-BLA', 'stock' => 3],
            ],
        ], $overrides);
    }

    public function test_only_admins_can_manage_products(): void
    {
        $this->getJson('/api/admin/products')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->vendedor()->create());
        $this->getJson('/api/admin/products')->assertForbidden();
        $this->postJson('/api/admin/products', $this->payload())->assertForbidden();
    }

    public function test_admin_creates_product_with_variants(): void
    {
        $this->asAdmin();

        $res = $this->postJson('/api/admin/products', $this->payload())->assertCreated();

        $res->assertJsonPath('data.sku', 'ASC-TS-092')
            ->assertJsonPath('data.slug', 'camiseta-boxy-archive-92')
            ->assertJsonPath('data.type.name', 'Camisetas oversize')
            ->assertJsonPath('data.total_stock', 13)
            ->assertJsonPath('data.stock_status', 'optimo')
            ->assertJsonPath('data.discount_percent', 14)
            ->assertJsonPath('data.variants.0.size', 'M')
            ->assertJsonPath('data.tags', ['Novedades', 'Colección 2025']);

        $this->assertDatabaseCount('product_variants', 2);
    }

    public function test_validation_rules(): void
    {
        $this->asAdmin();
        Product::create(['product_type_id' => $this->type->id, 'name' => 'Otro', 'sku' => 'ASC-TS-092', 'line' => 'hombre', 'price' => 1, 'status' => 'activo']);
        $inactive = ProductType::create(['name' => 'Archivo', 'is_active' => false]);

        $this->postJson('/api/admin/products', $this->payload([
            'product_type_id' => $inactive->id,
            'name' => '',
            'sale_price' => 200000,
            'variants' => [],
        ]))->assertUnprocessable()->assertJsonValidationErrors(['product_type_id', 'name', 'sku', 'sale_price', 'variants']);

        // SKU de variante repetido y combinación talla/color repetida
        $this->postJson('/api/admin/products', $this->payload([
            'sku' => 'NUEVO-1',
            'variants' => [
                ['size' => 'M', 'color' => 'Negro', 'sku' => 'X-1', 'stock' => 1],
                ['size' => 'm', 'color' => 'negro', 'sku' => 'X-1', 'stock' => -2],
            ],
        ]))->assertJsonValidationErrors(['variants.1.sku', 'variants.1.color', 'variants.1.stock']);
    }

    public function test_admin_updates_product_and_syncs_variants(): void
    {
        $this->asAdmin();
        $product = $this->postJson('/api/admin/products', $this->payload())->json('data');
        [$keep, $remove] = $product['variants'];

        $this->putJson("/api/admin/products/{$product['id']}", $this->payload([
            'name' => 'Camiseta Boxy Archive 93',
            'sale_price' => null,
            'status' => 'borrador',
            'variants' => [
                // El stock enviado para una variante existente se ignora: sólo cambia desde Inventario.
                ['id' => $keep['id'], 'size' => 'M', 'color' => 'Negro', 'sku' => 'ASC-TS-092-M-NEG', 'stock' => 2],
                ['size' => 'XL', 'color' => 'Rojo', 'sku' => 'ASC-TS-092-XL-ROJ', 'stock' => 4],
            ],
        ]))->assertOk()
            ->assertJsonPath('data.name', 'Camiseta Boxy Archive 93')
            ->assertJsonPath('data.sale_price', null)
            ->assertJsonPath('data.status', 'borrador')
            ->assertJsonPath('data.total_stock', 14)
            ->assertJsonCount(2, 'data.variants');

        $this->assertDatabaseHas('product_variants', ['id' => $keep['id'], 'stock' => 10]);
        $this->assertDatabaseMissing('product_variants', ['id' => $remove['id']]);
        // La variante quitada (3 und.) deja una salida en el kardex y la nueva su stock inicial.
        $this->assertDatabaseHas('stock_movements', ['sku' => 'ASC-TS-092-L-BLA', 'type' => 'salida', 'quantity' => -3, 'stock_after' => 0, 'product_variant_id' => null]);
        $this->assertDatabaseHas('stock_movements', ['sku' => 'ASC-TS-092-XL-ROJ', 'type' => 'inicial', 'quantity' => 4, 'stock_after' => 4]);
    }

    public function test_variants_of_another_product_cannot_be_hijacked(): void
    {
        $this->asAdmin();
        $a = $this->postJson('/api/admin/products', $this->payload())->json('data');
        $b = $this->postJson('/api/admin/products', $this->payload([
            'sku' => 'B-1', 'name' => 'Producto B',
            'variants' => [['size' => 'S', 'color' => 'Gris', 'sku' => 'B-1-S', 'stock' => 1]],
        ]))->json('data');

        $this->putJson("/api/admin/products/{$b['id']}", $this->payload([
            'sku' => 'B-1', 'name' => 'Producto B',
            'variants' => [['id' => $a['variants'][0]['id'], 'size' => 'S', 'color' => 'Gris', 'sku' => 'B-1-S', 'stock' => 1]],
        ]))->assertUnprocessable();
    }

    public function test_list_filters_and_summary(): void
    {
        $this->asAdmin();
        $this->postJson('/api/admin/products', $this->payload())->assertCreated();
        $this->postJson('/api/admin/products', $this->payload([
            'name' => 'Corset Siren', 'sku' => 'COR-1', 'line' => 'mujer', 'status' => 'borrador', 'sale_price' => null,
            'variants' => [['size' => 'S', 'color' => 'Rojo', 'sku' => 'COR-1-S', 'stock' => 0]],
        ]))->assertCreated();

        $this->getJson('/api/admin/products')->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('summary.active', 1)
            ->assertJsonPath('summary.drafts', 1)
            ->assertJsonPath('summary.out_of_stock', 1)
            ->assertJsonPath('summary.units', 13)
            ->assertJsonPath('summary.skus', 3);

        $this->getJson('/api/admin/products?line=mujer')->assertJsonCount(1, 'data')->assertJsonPath('data.0.name', 'Corset Siren');
        $this->getJson('/api/admin/products?status=agotado')->assertJsonCount(1, 'data')->assertJsonPath('data.0.sku', 'COR-1');
        $this->getJson('/api/admin/products?q=092-L-BLA')->assertJsonCount(1, 'data');
        $this->getJson("/api/admin/products?type={$this->type->id}")->assertJsonCount(2, 'data');
    }

    public function test_featured_toggle(): void
    {
        $this->asAdmin();
        $id = $this->postJson('/api/admin/products', $this->payload(['is_featured' => false]))->json('data.id');

        $this->patchJson("/api/admin/products/{$id}/featured", ['is_featured' => true])->assertOk()->assertJsonPath('data.is_featured', true);
    }

    public function test_image_upload_replace_and_delete(): void
    {
        Storage::fake('uploads');
        $this->asAdmin();
        $id = $this->postJson('/api/admin/products', $this->payload())->json('data.id');

        $this->postJson("/api/admin/products/{$id}/image", ['image' => UploadedFile::fake()->create('doc.pdf', 10, 'application/pdf')])
            ->assertJsonValidationErrors('image');

        $first = $this->postJson("/api/admin/products/{$id}/image", ['image' => UploadedFile::fake()->image('a.jpg', 600, 800)])->assertOk()->json('data.image_url');
        $firstPath = str_replace('/uploads/', '', $first);
        Storage::disk('uploads')->assertExists($firstPath);

        $second = $this->postJson("/api/admin/products/{$id}/image", ['image' => UploadedFile::fake()->image('b.png')])->json('data.image_url');
        Storage::disk('uploads')->assertMissing($firstPath);

        $this->deleteJson("/api/admin/products/{$id}/image")->assertOk()->assertJsonPath('data.image_url', null);
        Storage::disk('uploads')->assertMissing(str_replace('/uploads/', '', $second));
    }

    public function test_delete_product_removes_variants_and_image_but_keeps_sales_history(): void
    {
        Storage::fake('uploads');
        $this->asAdmin();
        $id = $this->postJson('/api/admin/products', $this->payload())->json('data.id');
        $url = $this->postJson("/api/admin/products/{$id}/image", ['image' => UploadedFile::fake()->image('a.jpg')])->json('data.image_url');

        $sale = Sale::create(['code' => 'ASC-1', 'status' => 'entregado', 'total' => 125000]);
        $item = SaleItem::create(['sale_id' => $sale->id, 'product_id' => $id, 'product_name' => 'Camiseta Boxy', 'quantity' => 1, 'unit_price' => 125000, 'line_total' => 125000]);

        $this->deleteJson("/api/admin/products/{$id}")->assertOk();

        $this->assertDatabaseMissing('products', ['id' => $id]);
        $this->assertDatabaseCount('product_variants', 0);
        Storage::disk('uploads')->assertMissing(str_replace('/uploads/', '', $url));
        $this->assertDatabaseHas('sale_items', ['id' => $item->id, 'product_id' => null, 'product_name' => 'Camiseta Boxy']);
    }
}
