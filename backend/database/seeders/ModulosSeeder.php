<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Modulo;

class ModulosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Modulo::create([
            'titulo' => 'Como o motor funciona',
            'codigo' => 'fundamentos',
            'descricao' => 'Entenda como o motor transforma combustível em movimento.',
            'ordem' => 1,
        ]);

        Modulo::create([
            'titulo' => 'Entrada e saída do ar',
            'codigo' => 'ar',
            'descricao' => 'Descubra como o ar entra e sai do motor.',
            'ordem' => 2,
        ]);

        Modulo::create([
            'titulo' => 'O caminho do combustível',
            'codigo' => 'combustivel',
            'descricao' => 'Acompanhe o combustível até a combustão.',
            'ordem' => 3,
        ]);

        Modulo::create([
            'titulo' => 'A faísca do motor',
            'codigo' => 'ignicao',
            'descricao' => 'Veja como a ignição inicia a combustão.',
            'ordem' => 4,
        ]);

        Modulo::create([
            'titulo' => 'Controlando a temperatura',
            'codigo' => 'arrefecimento',
            'descricao' => 'Aprenda como o motor controla seu calor.',
            'ordem' => 5,
        ]);

        Modulo::create([
            'titulo' => 'Lubrificação e proteção',
            'codigo' => 'lubrificacao',
            'descricao' => 'Descubra como o óleo protege o motor.',
            'ordem' => 6,
        ]);

        Modulo::create([
            'titulo' => 'Energia elétrica no veículo',
            'codigo' => 'eletrica',
            'descricao' => 'Entenda como a eletricidade movimenta o carro.',
            'ordem' => 7,
        ]);

        Modulo::create([
            'titulo' => 'Aumentando a potência',
            'codigo' => 'potencia',
            'descricao' => 'Veja como fazer o motor produzir mais potência.',
            'ordem' => 8,
        ]);

        Modulo::create([
            'titulo' => 'Como a potência chega ao asfalto',
            'codigo' => 'transmissao',
            'descricao' => 'Acompanhe a força do motor até as rodas.',
            'ordem' => 9,
        ]);

        Modulo::create([
            'titulo' => 'Parando o carro',
            'codigo' => 'freios',
            'descricao' => 'Entenda como os freios seguram o movimento.',
            'ordem' => 10,
        ]);

        Modulo::create([
            'titulo' => 'Suspensão e direção',
            'codigo' => 'suspensao_direcao',
            'descricao' => 'Descubra como o carro se mantém estável e controlável.',
            'ordem' => 11,
        ]);
    }
}
