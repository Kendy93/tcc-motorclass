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
        Schema::create('tentativa_questionarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('questionario_id')
                ->constrained('questionarios')
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->decimal('nota', 4, 1);
            $table->unsignedInteger('acertos');
            $table->unsignedInteger('erros');
            $table->unsignedInteger('percentual');
            $table->timestamp('concluido_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tentativa_questionarios');
    }
};
