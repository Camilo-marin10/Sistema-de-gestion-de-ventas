<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Inventario: cada cambio de stock de una variante queda registrado como movimiento.
 *  - stock_movements: kardex (tipo, variación, saldo antes/después, motivo, responsable, venta).
 *  - sale_items.product_variant_id: variante exacta vendida (para descontar su stock).
 *  - sales.stock_deducted_at: marca si la venta ya descontó stock (evita descontar dos veces).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stock_movements', function (Blueprint $table) {
            $table->foreignId('product_variant_id')->nullable()->after('id')->constrained('product_variants')->nullOnDelete();
            // Copia de los datos de la variante: el historial se conserva aunque se elimine el producto.
            $table->string('product_name', 150)->after('product_variant_id');
            $table->string('sku', 60)->after('product_name');
            $table->string('variant_label', 80)->nullable()->after('sku');
            $table->enum('type', ['inicial', 'entrada', 'salida', 'ajuste', 'venta', 'devolucion'])->after('variant_label')->index();
            $table->integer('quantity')->after('type'); // variación con signo (+ entra, - sale)
            $table->unsignedInteger('stock_before')->after('quantity');
            $table->unsignedInteger('stock_after')->after('stock_before');
            $table->string('reason', 120)->after('stock_after');
            $table->text('note')->nullable()->after('reason');
            $table->foreignId('user_id')->nullable()->after('note')->constrained('users')->nullOnDelete();
            $table->foreignId('sale_id')->nullable()->after('user_id')->constrained('sales')->nullOnDelete();
            $table->index('created_at');
        });

        Schema::table('sale_items', function (Blueprint $table) {
            $table->foreignId('product_variant_id')->nullable()->after('product_id')->constrained('product_variants')->nullOnDelete();
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->timestamp('stock_deducted_at')->nullable()->after('confirmed_at');
        });
    }

    public function down(): void
    {
        Schema::table('sales', fn (Blueprint $table) => $table->dropColumn('stock_deducted_at'));

        Schema::table('sale_items', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
            $table->dropColumn('product_variant_id');
        });

        Schema::table('stock_movements', function (Blueprint $table) {
            $table->dropForeign(['product_variant_id']);
            $table->dropForeign(['user_id']);
            $table->dropForeign(['sale_id']);
            $table->dropIndex(['type']);
            $table->dropIndex(['created_at']);
            $table->dropColumn([
                'product_variant_id', 'product_name', 'sku', 'variant_label', 'type', 'quantity',
                'stock_before', 'stock_after', 'reason', 'note', 'user_id', 'sale_id',
            ]);
        });
    }
};
