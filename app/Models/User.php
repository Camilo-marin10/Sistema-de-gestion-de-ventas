<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    public const ROLE_ADMIN = 'admin';
    public const ROLE_VENDEDOR = 'vendedor';
    public const ROLE_CLIENTE = 'cliente';

    public const ROLES = [self::ROLE_ADMIN, self::ROLE_VENDEDOR, self::ROLE_CLIENTE];

    public const ROLE_LABELS = [
        self::ROLE_ADMIN => 'Administrador',
        self::ROLE_VENDEDOR => 'Vendedor',
        self::ROLE_CLIENTE => 'Cliente',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * `role` e `is_active` NO son asignables masivamente: se fijan explícitamente
     * para que nadie pueda auto-asignarse un rol desde el registro público.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    public const EMPLOYEE_ROLES = [self::ROLE_ADMIN, self::ROLE_VENDEDOR];

    /** Compras realizadas como cliente. */
    public function purchases(): HasMany
    {
        return $this->hasMany(Sale::class, 'customer_id');
    }

    /** Ventas gestionadas como empleado (admin o vendedor). */
    public function managedSales(): HasMany
    {
        return $this->hasMany(Sale::class, 'seller_id');
    }

    public function isEmployee(): bool
    {
        return $this->hasRole(...self::EMPLOYEE_ROLES);
    }

    public function hasRole(string ...$roles): bool
    {
        return in_array($this->role, $roles, true);
    }

    public function roleLabel(): string
    {
        return self::ROLE_LABELS[$this->role] ?? ucfirst((string) $this->role);
    }
}
