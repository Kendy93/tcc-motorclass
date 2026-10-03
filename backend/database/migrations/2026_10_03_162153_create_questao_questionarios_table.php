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
        Schema::create('questao_questionarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('questionario_id')
                ->constrained('questionarios')
                ->cascadeOnDelete();
            $table->string('codigo');
            $table->string('tipo');
            $table->text('pergunta');
            $table->text('resposta_correta');
            $table->text('explicacao')->nullable();
            $table->json('opcoes')->nullable();
            $table->unique(['questionario_id', 'codigo']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questao_questionarios');
    }
};
