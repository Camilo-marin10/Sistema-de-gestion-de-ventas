<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Estructura de ventas.
 *  - sales.customer_id → cliente que compra (users, rol cliente).
 *  - sales.seller_id   → empleado que gestiona la venta (users, rol admin/vendedor).
 *  - sale_items guarda una "foto" del producto (nombre, SKU, talla, color, precio)
 *    para que el historial no cambie si el producto se edita o elimina después.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->string('code', 20)->unique()->after('id');
            $table->foreignId('customer_id')->nullable()->after('code')->constrained('users')->nullOnDelete();
            $table->foreignId('seller_id')->nullable()->after('customer_id')->constrained('users')->nullOnDelete();
            $table->enum('channel', ['web', 'whatsapp', 'instagram', 'tiktok', 'tienda'])->default('web')->after('seller_id');
            $table->enum('status', ['pendiente', 'confirmado', 'preparacion', 'enviado', 'entregado', 'cancelado'])
                ->default('pendiente')->after('channel')->index();
            $table->decimal('subtotal', 12, 2)->default(0)->after('status');
            $table->decimal('discount', 12, 2)->default(0)->after('subtotal');
            $table->decimal('total', 12, 2)->default(0)->after('discount');
            $table->string('coupon_code', 40)->nullable()->after('total');
            $table->text('notes')->nullable()->after('coupon_code');
            $table->timestamp('confirmed_at')->nullable()->after('notes');
        });

        Schema::table('sale_items', function (Blueprint $table) {
            $table->foreignId('sale_id')->after('id')->constrained('sales')->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->after('sale_id')->constrained('products')->nullOnDelete();
            $table->string('product_name', 150)->after('product_id');
            $table->string('sku', 60)->nullable()->after('product_name');
            $table->string('size', 20)->nullable()->after('sku');
            $table->string('color', 40)->nullable()->after('size');
            $table->unsignedInteger('quantity')->default(1)->after('color');
            $table->decimal('unit_price', 12, 2)->after('quantity');
            $table->decimal('line_total', 12, 2)->after('unit_price');
        });
    }

    public function down(): void
    {
        Schema::table('sale_items', function (Blueprint $table) {
            $table->dropForeign(['sale_id']);
            $table->dropForeign(['product_id']);
            $table->dropColumn(['sale_id', 'product_id', 'product_name', 'sku', 'size', 'color', 'quantity', 'unit_price', 'line_total']);
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['seller_id']);
            $table->dropUnique(['code']);
            $table->dropIndex(['status']);
            $table->dropColumn(['code', 'customer_id', 'seller_id', 'channel', 'status', 'subtotal', 'discount', 'total', 'coupon_code', 'notes', 'confirmed_at']);
        });
    }
};
