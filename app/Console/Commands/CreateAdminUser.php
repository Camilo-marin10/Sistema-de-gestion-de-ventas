<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

/**
 * Crea (o promueve) un usuario administrador sin dejar credenciales en el código fuente.
 *
 *   php artisan ascend:crear-admin --name="Nombre" --email=correo@dominio.com
 *   (la contraseña se solicita de forma oculta si no se pasa --password)
 */
class CreateAdminUser extends Command
{
    protected $signature = 'ascend:crear-admin
                            {--name= : Nombre completo}
                            {--email= : Correo electrónico (usuario de acceso)}
                            {--password= : Contraseña (si se omite, se solicita de forma oculta)}';

    protected $description = 'Crea un usuario con rol administrador (o promueve uno existente)';

    public function handle(): int
    {
        $name = $this->option('name') ?: $this->ask('Nombre completo');
        $email = mb_strtolower(trim($this->option('email') ?: $this->ask('Correo electrónico')));
        $password = $this->option('password') ?: $this->secret('Contraseña');

        $validator = Validator::make(compact('name', 'email', 'password'), [
            'name' => ['required', 'string', 'min:3', 'max:120'],
            'email' => ['required', 'email', 'max:150'],
            'password' => ['required', Password::min(8)->letters()->numbers()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = User::firstOrNew(['email' => $email]);
        $existed = $user->exists;

        $user->name = $name;
        $user->password = $password; // el cast "hashed" la cifra con bcrypt
        $user->role = User::ROLE_ADMIN;
        $user->is_active = true;
        $user->email_verified_at ??= now();
        $user->save();

        $this->info(($existed ? 'Administrador actualizado: ' : 'Administrador creado: ')."{$user->name} <{$user->email}>");

        return self::SUCCESS;
    }
}
