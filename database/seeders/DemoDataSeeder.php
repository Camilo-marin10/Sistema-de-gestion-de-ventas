<?php

namespace Database\Seeders;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Datos de demostración (opcional) para probar listas e historiales.
 *
 *   php artisan db:seed --class=DemoDataSeeder
 *
 * Todos los usuarios usan el dominio @demo.ascend.co para poder identificarlos
 * y eliminarlos fácilmente: php artisan ascend:limpiar-demo
 */
class DemoDataSeeder extends Seeder
{
    public const DOMAIN = 'demo.ascend.co';

    public function run(): void
    {
        $password = 'Demo12345';

        $sellers = collect([
            ['Juan Pérez', 'juan.perez'],
            ['Laura Restrepo', 'laura.restrepo'],
            ['Andrés Gómez', 'andres.gomez'],
        ])->map(fn ($s) => User::factory()->vendedor()->create([
            'name' => $s[0],
            'email' => $s[1].'@'.self::DOMAIN,
            'password' => $password,
            'last_login_at' => now()->subHours(rand(1, 72)),
        ]));

        // Un vendedor inactivo para probar filtros.
        $sellers->last()->forceFill(['is_active' => false])->save();

        $clientNames = [
            'Valentina Morales', 'Camila Rincón', 'Mateo Gómez', 'Sofía Vergara Díaz', 'Laura Méndez',
            'Carlos Henao', 'Mariana Castro', 'Valeria Henao', 'Santiago Ríos', 'Isabella Duque',
            'Tomás Arango', 'Daniela Ochoa',
        ];

        $clients = collect($clientNames)->map(function ($name, $i) use ($password) {
            $slug = strtolower(str_replace([' ', 'á', 'é', 'í', 'ó', 'ú'], ['.', 'a', 'e', 'i', 'o', 'u'], $name));

            return User::factory()->create([
                'name' => $name,
                'email' => $slug.'@'.self::DOMAIN,
                'password' => $password,
                'is_active' => $i !== 11,
                'created_at' => now()->subDays(rand(5, 200)),
                'last_login_at' => $i % 4 === 0 ? null : now()->subDays(rand(0, 40)),
            ]);
        });

        // Compras: la mayoría de clientes compra 0–6 veces; algunas ventas son web sin asesor.
        $clients->each(function (User $client, $i) use ($sellers) {
            $count = [6, 4, 3, 5, 2, 1, 3, 0, 2, 4, 0, 1][$i];
            for ($n = 0; $n < $count; $n++) {
                Sale::factory()->create([
                    'customer_id' => $client->id,
                    'seller_id' => rand(1, 10) > 2 ? $sellers->random()->id : null,
                ]);
            }
        });

        // Ventas gestionadas por los administradores reales (si existen).
        User::where('role', User::ROLE_ADMIN)->where('email', 'not like', '%@'.self::DOMAIN)->get()
            ->each(fn (User $admin) => Sale::factory()->count(3)->create([
                'customer_id' => $clients->random()->id,
                'seller_id' => $admin->id,
            ]));
    }
}
