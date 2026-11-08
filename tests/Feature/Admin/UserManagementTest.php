<?php

namespace Tests\Feature\Admin;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->admin()->create(['name' => 'Admin Uno']);
    }

    private function actingAsAdmin(): void
    {
        Sanctum::actingAs($this->admin);
    }

    public function test_requires_authentication_and_admin_role(): void
    {
        $this->getJson('/api/admin/users?group=clientes')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->vendedor()->create());
        $this->getJson('/api/admin/users?group=clientes')->assertForbidden();

        Sanctum::actingAs(User::factory()->create());
        $this->getJson('/api/admin/users?group=empleados')->assertForbidden();
    }

    public function test_lists_are_split_between_employees_and_clients(): void
    {
        User::factory()->vendedor()->count(2)->create();
        User::factory()->count(3)->create();
        $this->actingAsAdmin();

        $employees = $this->getJson('/api/admin/users?group=empleados')->assertOk();
        $this->assertCount(3, $employees->json('data'));
        $this->assertEqualsCanonicalizing(['admin', 'vendedor'], array_unique(array_column($employees->json('data'), 'role')));
        $employees->assertJsonPath('summary.admins', 1)->assertJsonPath('summary.vendedores', 2);

        $clients = $this->getJson('/api/admin/users?group=clientes')->assertOk();
        $this->assertCount(3, $clients->json('data'));
        $this->assertSame(['cliente'], array_values(array_unique(array_column($clients->json('data'), 'role'))));
    }

    public function test_search_and_status_filters(): void
    {
        User::factory()->create(['name' => 'Valentina Morales', 'email' => 'vale@test.com']);
        User::factory()->inactive()->create(['name' => 'Carlos Henao']);
        $this->actingAsAdmin();

        $this->getJson('/api/admin/users?group=clientes&q=valen')->assertJsonCount(1, 'data')->assertJsonPath('data.0.name', 'Valentina Morales');
        $this->getJson('/api/admin/users?group=clientes&status=inactivo')->assertJsonCount(1, 'data')->assertJsonPath('data.0.name', 'Carlos Henao');
    }

    public function test_admin_creates_user_with_any_role(): void
    {
        $this->actingAsAdmin();

        $this->postJson('/api/admin/users', [
            'name' => 'Juan Pérez', 'email' => 'JUAN@ascend.com', 'phone' => '+57 300 111 2233',
            'role' => 'vendedor', 'is_active' => true,
            'password' => 'Vendedor123', 'password_confirmation' => 'Vendedor123',
        ])->assertCreated()->assertJsonPath('data.role', 'vendedor')->assertJsonPath('data.email', 'juan@ascend.com');

        $this->postJson('/api/auth/login', ['email' => 'juan@ascend.com', 'password' => 'Vendedor123'])->assertOk();
    }

    public function test_create_validates_input(): void
    {
        $this->actingAsAdmin();

        $this->postJson('/api/admin/users', ['name' => 'X', 'email' => $this->admin->email, 'role' => 'superadmin', 'is_active' => true])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'role', 'password']);
    }

    public function test_admin_edits_user_and_changes_role_revoking_sessions(): void
    {
        $client = User::factory()->create();
        $client->createToken('spa');
        $this->actingAsAdmin();

        $this->putJson("/api/admin/users/{$client->id}", [
            'name' => 'Nuevo Nombre', 'email' => 'nuevo@test.com', 'phone' => null,
            'role' => 'vendedor', 'is_active' => true,
        ])->assertOk()->assertJsonPath('data.role', 'vendedor')->assertJsonPath('data.name', 'Nuevo Nombre');

        $this->assertSame(0, $client->tokens()->count());
        $this->assertTrue(password_verify('password', $client->fresh()->password), 'La contraseña se conserva si se deja vacía');
    }

    public function test_admin_can_reset_password(): void
    {
        $seller = User::factory()->vendedor()->create();
        $this->actingAsAdmin();

        $this->putJson("/api/admin/users/{$seller->id}", [
            'name' => $seller->name, 'email' => $seller->email, 'role' => 'vendedor', 'is_active' => true,
            'password' => 'NuevaClave99', 'password_confirmation' => 'NuevaClave99',
        ])->assertOk();

        $this->postJson('/api/auth/login', ['email' => $seller->email, 'password' => 'NuevaClave99'])->assertOk();
    }

    public function test_admin_cannot_demote_or_deactivate_themselves(): void
    {
        User::factory()->admin()->create();
        $this->actingAsAdmin();
        $payload = ['name' => $this->admin->name, 'email' => $this->admin->email, 'role' => 'admin', 'is_active' => true];

        $this->putJson("/api/admin/users/{$this->admin->id}", [...$payload, 'role' => 'vendedor'])->assertJsonValidationErrors('role');
        $this->putJson("/api/admin/users/{$this->admin->id}", [...$payload, 'is_active' => false])->assertJsonValidationErrors('is_active');
        $this->deleteJson("/api/admin/users/{$this->admin->id}")->assertUnprocessable();
    }

    public function test_admin_can_demote_another_admin_while_remaining_admin(): void
    {
        $other = User::factory()->admin()->create();
        $this->actingAsAdmin();

        $this->putJson("/api/admin/users/{$other->id}", ['name' => $other->name, 'email' => $other->email, 'role' => 'vendedor', 'is_active' => true])
            ->assertOk()
            ->assertJsonPath('data.role', 'vendedor');
    }

    public function test_deactivated_admin_loses_panel_access_immediately(): void
    {
        $other = User::factory()->admin()->create();
        $token = $other->createToken('spa')->plainTextToken;
        $this->actingAsAdmin();

        $this->putJson("/api/admin/users/{$other->id}", ['name' => $other->name, 'email' => $other->email, 'role' => 'admin', 'is_active' => false])->assertOk();

        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_inactive_users_cannot_log_in(): void
    {
        $client = User::factory()->inactive()->create();

        $this->postJson('/api/auth/login', ['email' => $client->email, 'password' => 'password'])->assertForbidden();
    }

    public function test_delete_is_blocked_when_user_has_sales_history(): void
    {
        $client = User::factory()->create();
        Sale::factory()->create(['customer_id' => $client->id]);
        $fresh = User::factory()->create();
        $this->actingAsAdmin();

        $this->deleteJson("/api/admin/users/{$client->id}")->assertUnprocessable();
        $this->deleteJson("/api/admin/users/{$fresh->id}")->assertOk();
        $this->assertModelMissing($fresh);
    }

    public function test_client_history_lists_purchases_and_employee_history_lists_managed_sales(): void
    {
        $client = User::factory()->create();
        $seller = User::factory()->vendedor()->create();
        Sale::factory()->count(3)->create(['customer_id' => $client->id, 'seller_id' => $seller->id, 'status' => 'entregado']);
        Sale::factory()->create(['customer_id' => $client->id, 'seller_id' => $seller->id, 'status' => 'cancelado']);
        Sale::factory()->create(['seller_id' => $seller->id, 'status' => 'confirmado']);
        $this->actingAsAdmin();

        $this->getJson("/api/admin/users/{$client->id}/history")->assertOk()
            ->assertJsonPath('type', 'compras')
            ->assertJsonCount(4, 'data')
            ->assertJsonPath('data.0.seller.name', $seller->name);

        $this->getJson("/api/admin/users/{$seller->id}/history")->assertOk()
            ->assertJsonPath('type', 'ventas')
            ->assertJsonCount(5, 'data');

        $show = $this->getJson("/api/admin/users/{$client->id}")->assertOk();
        $show->assertJsonPath('stats.type', 'compras')->assertJsonPath('stats.count', 3)->assertJsonPath('stats.cancelled', 1);
        $this->assertEqualsWithDelta(
            Sale::where('customer_id', $client->id)->where('status', '!=', 'cancelado')->sum('total'),
            $show->json('stats.total'),
            0.01,
        );

        $this->getJson('/api/admin/users?group=clientes')->assertJsonPath('data.0.activity.count', 3);
    }
}
