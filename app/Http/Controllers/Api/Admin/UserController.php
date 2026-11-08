<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SaveUserRequest;
use App\Http\Resources\AdminUserResource;
use App\Http\Resources\SaleHistoryResource;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

/**
 * Gestión de usuarios del panel de administración.
 *  - grupo "empleados": admin + vendedor (historial = ventas gestionadas)
 *  - grupo "clientes":  cliente          (historial = compras realizadas)
 */
class UserController extends Controller
{
    private const GROUPS = [
        'empleados' => User::EMPLOYEE_ROLES,
        'clientes' => [User::ROLE_CLIENTE],
    ];

    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'group' => ['required', Rule::in(array_keys(self::GROUPS))],
            'q' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', Rule::in(User::ROLES)],
            'status' => ['nullable', Rule::in(['activo', 'inactivo'])],
            'sort' => ['nullable', Rule::in(['recientes', 'nombre', 'actividad'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ]);

        $group = $validated['group'];
        $roles = self::GROUPS[$group];
        $relation = $group === 'empleados' ? 'managedSales' : 'purchases';
        $effective = fn (Builder $q) => $q->where('status', '!=', 'cancelado');

        $query = User::query()
            ->whereIn('role', $roles)
            ->withCount([$relation => $effective])
            ->withSum([$relation => $effective], 'total');

        if (! empty($validated['q'])) {
            $term = '%'.$validated['q'].'%';
            $query->where(fn (Builder $q) => $q->where('name', 'like', $term)
                ->orWhere('email', 'like', $term)
                ->orWhere('phone', 'like', $term));
        }
        if (! empty($validated['role']) && in_array($validated['role'], $roles, true)) {
            $query->where('role', $validated['role']);
        }
        if (! empty($validated['status'])) {
            $query->where('is_active', $validated['status'] === 'activo');
        }

        match ($validated['sort'] ?? 'recientes') {
            'nombre' => $query->orderBy('name'),
            'actividad' => $query->orderByDesc(($group === 'empleados' ? 'managed_sales' : 'purchases').'_sum_total'),
            default => $query->latest('id'),
        };

        $page = $query->paginate($validated['per_page'] ?? 10)->withQueryString();

        return AdminUserResource::collection($page)
            ->additional(['summary' => $this->summary($group)])
            ->response();
    }

    public function store(SaveUserRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = new User($request->safe()->only(['name', 'email', 'phone', 'password']));
        $user->role = $data['role'];
        $user->is_active = $data['is_active'];
        $user->email_verified_at = now();
        $user->save();

        return (new AdminUserResource($this->withActivity($user)))
            ->additional(['message' => 'Usuario creado correctamente.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(User $user): JsonResponse
    {
        $relation = $user->isEmployee() ? 'managedSales' : 'purchases';
        $effective = $user->{$relation}()->where('status', '!=', 'cancelado');

        $stats = [
            'type' => $user->isEmployee() ? 'ventas' : 'compras',
            'count' => (clone $effective)->count(),
            'total' => (float) (clone $effective)->sum('total'),
            'average' => (float) round((clone $effective)->avg('total') ?? 0, 2),
            'cancelled' => $user->{$relation}()->where('status', 'cancelado')->count(),
            'pending' => $user->{$relation}()->whereIn('status', ['pendiente', 'confirmado', 'preparacion'])->count(),
            'last_at' => optional($user->{$relation}()->latest()->first())->created_at?->toIso8601String(),
        ];

        return (new AdminUserResource($this->withActivity($user)))
            ->additional(['stats' => $stats])
            ->response();
    }

    public function update(SaveUserRequest $request, User $user): JsonResponse
    {
        $data = $request->validated();
        $actor = $request->user();
        $isSelf = $actor->is($user);

        if ($isSelf && $data['role'] !== $user->role) {
            throw ValidationException::withMessages(['role' => 'No puedes cambiar tu propio rol.']);
        }
        if ($isSelf && ! $data['is_active']) {
            throw ValidationException::withMessages(['is_active' => 'No puedes desactivar tu propia cuenta.']);
        }
        $losesAdmin = $user->role === User::ROLE_ADMIN && ($data['role'] !== User::ROLE_ADMIN || ! $data['is_active']);
        if ($losesAdmin && $this->isLastActiveAdmin($user)) {
            throw ValidationException::withMessages(['role' => 'Debe existir al menos un administrador activo en el sistema.']);
        }

        $securityChanged = $data['role'] !== $user->role
            || (bool) $data['is_active'] !== (bool) $user->is_active
            || ! empty($data['password']);

        $user->fill($request->safe()->only(['name', 'email', 'phone']));
        if (! empty($data['password'])) {
            $user->password = $data['password'];
        }
        $user->role = $data['role'];
        $user->is_active = $data['is_active'];
        $user->save();

        // Cambios de acceso: se cierran las sesiones abiertas del usuario (excepto la actual si es uno mismo).
        if ($securityChanged) {
            $user->tokens()
                ->when($isSelf, fn ($q) => $q->where('id', '!=', $actor->currentAccessToken()?->id))
                ->delete();
        }

        return (new AdminUserResource($this->withActivity($user->fresh())))
            ->additional(['message' => 'Usuario actualizado correctamente.'])
            ->response();
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        if ($request->user()->is($user)) {
            return response()->json(['message' => 'No puedes eliminar tu propia cuenta.'], 422);
        }
        if ($user->role === User::ROLE_ADMIN && $this->isLastActiveAdmin($user)) {
            return response()->json(['message' => 'Debe existir al menos un administrador activo en el sistema.'], 422);
        }
        if ($user->purchases()->exists() || $user->managedSales()->exists()) {
            return response()->json([
                'message' => 'Este usuario tiene ventas registradas en su historial. Desactívalo en lugar de eliminarlo para conservar los registros.',
            ], 422);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente.']);
    }

    /**
     * Historial: compras (cliente) o ventas gestionadas (empleado), con sus prendas.
     */
    public function history(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', Rule::in(array_keys(Sale::STATUS_LABELS))],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ]);

        $isEmployee = $user->isEmployee();
        $sales = ($isEmployee ? $user->managedSales() : $user->purchases())
            ->with(['items', $isEmployee ? 'customer:id,name' : 'seller:id,name'])
            ->when($validated['status'] ?? null, fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate($validated['per_page'] ?? 10)
            ->withQueryString();

        return SaleHistoryResource::collection($sales)
            ->additional(['type' => $isEmployee ? 'ventas' : 'compras'])
            ->response();
    }

    private function withActivity(User $user): User
    {
        $effective = fn (Builder $q) => $q->where('status', '!=', 'cancelado');
        $relation = $user->isEmployee() ? 'managedSales' : 'purchases';

        return $user->loadCount([$relation => $effective])->loadSum([$relation => $effective], 'total');
    }

    private function isLastActiveAdmin(User $user): bool
    {
        return ! User::where('role', User::ROLE_ADMIN)
            ->where('is_active', true)
            ->whereKeyNot($user->getKey())
            ->exists();
    }

    /** @return array<string, int> */
    private function summary(string $group): array
    {
        $base = User::whereIn('role', self::GROUPS[$group]);

        $summary = [
            'total' => (clone $base)->count(),
            'active' => (clone $base)->where('is_active', true)->count(),
            'inactive' => (clone $base)->where('is_active', false)->count(),
            'new_this_month' => (clone $base)->where('created_at', '>=', now()->startOfMonth())->count(),
        ];

        if ($group === 'empleados') {
            $summary['admins'] = (clone $base)->where('role', User::ROLE_ADMIN)->count();
            $summary['vendedores'] = (clone $base)->where('role', User::ROLE_VENDEDOR)->count();
        } else {
            $summary['with_purchases'] = (clone $base)->whereHas('purchases', fn ($q) => $q->where('status', '!=', 'cancelado'))->count();
        }

        return $summary;
    }
}
