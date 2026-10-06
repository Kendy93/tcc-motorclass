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
        Schema::table('questao_questionarios', function (Blueprint $table) {
            $table->string('destaque')->nullable()->after('pergunta');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questao_questionarios', function (Blueprint $table) {
            $table->dropColumn('destaque');
        });
    }
};
