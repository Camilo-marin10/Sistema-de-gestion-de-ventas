<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Las categorías del catálogo son los Tipos de producto (product_types);
 * la tabla `categories` del esqueleto inicial nunca se usó.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('categories');
    }

    public function down(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }
};
