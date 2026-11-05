<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // As imagens dos cards foram convertidas de PNG para WebP
        DB::table('modulos')
            ->where('imagem', 'like', '%/principal.png')
            ->update(['imagem' => DB::raw("REPLACE(imagem, '/principal.png', '/principal.webp')")]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('modulos')
            ->where('imagem', 'like', '%/principal.webp')
            ->update(['imagem' => DB::raw("REPLACE(imagem, '/principal.webp', '/principal.png')")]);
    }
};
