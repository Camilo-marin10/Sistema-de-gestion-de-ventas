<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Usuario visto desde el panel de administración.
 * `activity` resume compras (clientes) o ventas gestionadas (empleados) cuando se cargan los agregados.
 *
 * @mixin \App\Models\User
 */
class AdminUserResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isEmployee = $this->isEmployee();
        $count = $isEmployee ? $this->managed_sales_count : $this->purchases_count;
        $total = $isEmployee ? $this->managed_sales_sum_total : $this->purchases_sum_total;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role,
            'role_label' => $this->roleLabel(),
            'is_employee' => $isEmployee,
            'is_active' => (bool) $this->is_active,
            'last_login_at' => $this->last_login_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'activity' => $this->when($count !== null, fn () => [
                'type' => $isEmployee ? 'ventas' : 'compras',
                'count' => (int) $count,
                'total' => (float) ($total ?? 0),
            ]),
        ];
    }
}
