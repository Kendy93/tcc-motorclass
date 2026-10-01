<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recompensa_usuarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('modulo_id')->constrained()->cascadeOnDelete();

            $table->string('recompensa_codigo');
            $table->boolean('equipada')->default(true);

            $table->unique([
                'user_id',
                'recompensa_codigo',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recompensa_usuarios');
    }
};
