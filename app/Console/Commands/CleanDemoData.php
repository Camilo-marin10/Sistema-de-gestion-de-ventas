<?php

namespace App\Console\Commands;

use App\Models\Sale;
use App\Models\User;
use Database\Seeders\DemoDataSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Elimina los datos generados por DemoDataSeeder (usuarios @demo.ascend.co y sus ventas).
 */
class CleanDemoData extends Command
{
    protected $signature = 'ascend:limpiar-demo {--force : No pedir confirmación}';

    protected $description = 'Elimina los usuarios y ventas de demostración (@'.DemoDataSeeder::DOMAIN.')';

    public function handle(): int
    {
        $demoIds = User::where('email', 'like', '%@'.DemoDataSeeder::DOMAIN)->pluck('id');

        if ($demoIds->isEmpty()) {
            $this->info('No hay datos de demostración.');

            return self::SUCCESS;
        }

        $sales = Sale::whereIn('customer_id', $demoIds)->orWhereIn('seller_id', $demoIds);
        $salesCount = (clone $sales)->count();

        if (! $this->option('force') && ! $this->confirm("Se eliminarán {$demoIds->count()} usuarios demo y {$salesCount} ventas. ¿Continuar?")) {
            return self::FAILURE;
        }

        DB::transaction(function () use ($sales, $demoIds) {
            $sales->delete(); // sale_items se eliminan en cascada
            DB::table('personal_access_tokens')->where('tokenable_type', User::class)->whereIn('tokenable_id', $demoIds)->delete();
            User::whereIn('id', $demoIds)->delete();
        });

        $this->info("Eliminados {$demoIds->count()} usuarios demo y {$salesCount} ventas.");

        return self::SUCCESS;
    }
}
