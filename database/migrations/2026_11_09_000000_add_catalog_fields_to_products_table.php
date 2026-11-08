<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catálogo de productos.
 *  - products: datos comerciales del producto (precio, línea, tipo, estado...).
 *  - product_variants: combinaciones talla/color con su SKU y stock propio.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('name', 150)->after('product_type_id');
            $table->string('slug', 170)->unique()->after('name');
            $table->string('sku', 40)->unique()->after('slug');
            $table->enum('line', ['hombre', 'mujer', 'unisex'])->default('unisex')->after('sku')->index();
            $table->text('description')->nullable()->after('line');
            $table->decimal('price', 12, 2)->after('description');
            $table->decimal('sale_price', 12, 2)->nullable()->after('price');
            $table->unsignedInteger('stock_alert_threshold')->default(5)->after('sale_price');
            $table->enum('status', ['activo', 'borrador', 'inactivo'])->default('borrador')->after('stock_alert_threshold')->index();
            $table->boolean('is_featured')->default(false)->after('status');
            $table->json('tags')->nullable()->after('is_featured');
            $table->string('image_path')->nullable()->after('tags');
        });

        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('size', 20);
            $table->string('color', 40);
            $table->string('color_hex', 7)->nullable();
            $table->string('sku', 60)->unique();
            $table->unsignedInteger('stock')->default(0);
            $table->timestamps();

            $table->unique(['product_id', 'size', 'color']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');

        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropUnique(['sku']);
            $table->dropIndex(['line']);
            $table->dropIndex(['status']);
            $table->dropColumn(['name', 'slug', 'sku', 'line', 'description', 'price', 'sale_price', 'stock_alert_threshold', 'status', 'is_featured', 'tags', 'image_path']);
        });
    }
};
