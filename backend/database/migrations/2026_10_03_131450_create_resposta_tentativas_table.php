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
        Schema::create('resposta_tentativas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignId('tentativa_id')
                ->constrained('tentativa_questionarios')
                ->cascadeOnDelete();
            $table->string('questao_id');
            $table->string('tipo');
            $table->text('pergunta');
            $table->json('resposta');
            $table->json('resposta_correta')
                ->nullable();
            $table->boolean('correta');
            $table->index([
                'tentativa_id',
                'questao_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resposta_tentativas');
    }
};
