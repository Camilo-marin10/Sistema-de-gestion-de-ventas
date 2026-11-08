<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductTypeTest extends TestCase
{
    use RefreshDatabase;

    private function asAdmin(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
    }

    public function test_only_admins_manage_product_types(): void
    {
        $this->getJson('/api/admin/product-types')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->vendedor()->create());
        $this->getJson('/api/admin/product-types')->assertForbidden();
        $this->postJson('/api/admin/product-types', ['name' => 'Tenis'])->assertForbidden();

        Sanctum::actingAs(User::factory()->create());
        $this->getJson('/api/catalog/product-types')->assertForbidden();
    }

    public function test_admin_creates_lists_and_edits_types(): void
    {
        $this->asAdmin();

        $id = $this->postJson('/api/admin/product-types', ['name' => '  Camisetas   Oversize ', 'description' => 'Corte amplio'])
            ->assertCreated()
            ->assertJsonPath('data.name', 'Camisetas Oversize')
            ->assertJsonPath('data.slug', 'camisetas-oversize')
            ->assertJsonPath('data.is_active', true)
            ->json('data.id');

        $this->postJson('/api/admin/product-types', ['name' => 'Tenis Urbanos'])->assertCreated();

        $this->getJson('/api/admin/product-types')->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.name', 'Camisetas Oversize')   // orden alfabético
            ->assertJsonPath('summary.total', 2);

        $this->putJson("/api/admin/product-types/{$id}", ['name' => 'Camisetas Boxy', 'description' => null, 'is_active' => false])
            ->assertOk()
            ->assertJsonPath('data.slug', 'camisetas-boxy')
            ->assertJsonPath('data.is_active', false);
    }

    public function test_names_must_be_unique_ignoring_case_and_spaces(): void
    {
        $this->asAdmin();
        $type = ProductType::create(['name' => 'Corsets']);

        $this->postJson('/api/admin/product-types', ['name' => 'CORSETS'])->assertJsonValidationErrors('name');
        $this->postJson('/api/admin/product-types', ['name' => ''])->assertJsonValidationErrors('name');
        $this->putJson("/api/admin/product-types/{$type->id}", ['name' => 'Corsets', 'is_active' => true])->assertOk();
    }

    public function test_type_in_use_cannot_be_deleted(): void
    {
        $this->asAdmin();
        $used = ProductType::create(['name' => 'Bodys']);
        Product::create(['product_type_id' => $used->id, 'name' => 'Body Nexus', 'sku' => 'BOD-1', 'line' => 'mujer', 'price' => 160000, 'status' => 'activo']);
        $free = ProductType::create(['name' => 'Sacos']);

        $this->getJson('/api/admin/product-types')->assertJsonPath('data.0.products_count', 1);
        $this->deleteJson("/api/admin/product-types/{$used->id}")->assertUnprocessable();
        $this->deleteJson("/api/admin/product-types/{$free->id}")->assertOk();
        $this->assertModelExists($used);
        $this->assertModelMissing($free);
    }

    public function test_select_options_only_include_active_types(): void
    {
        $active = ProductType::create(['name' => 'Tenis']);
        $inactive = ProductType::create(['name' => 'Archivo', 'is_active' => false]);
        Sanctum::actingAs(User::factory()->vendedor()->create());

        $this->getJson('/api/catalog/product-types')->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Tenis');

        // Al editar un producto con un tipo desactivado, ese tipo se incluye para no perder el valor.
        $this->getJson("/api/catalog/product-types?include={$inactive->id}")->assertJsonCount(2, 'data');
        $this->assertNotNull($active);
    }
}
