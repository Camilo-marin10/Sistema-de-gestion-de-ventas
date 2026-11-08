<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tipos de producto: clasificación a la que se anidan los productos
 * (ej. Camisetas oversize, Camisetas ombligueras, Tenis urbanos...).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 80)->unique();
            $table->string('slug', 100)->unique();
            $table->string('description', 255)->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        // Un tipo con productos asociados no se puede eliminar (restrictOnDelete).
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('product_type_id')->nullable()->after('id')->constrained('product_types')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['product_type_id']);
            $table->dropColumn('product_type_id');
        });

        Schema::dropIfExists('product_types');
    }
};
