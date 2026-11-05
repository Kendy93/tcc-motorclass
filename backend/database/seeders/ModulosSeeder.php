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
            'imagem' => '/images/01_como_o_motor_funciona/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Entrada e saída do ar',
            'codigo' => 'ar',
            'descricao' => 'Descubra como o ar entra e sai do motor.',
            'ordem' => 2,
            'imagem' => '/images/02_entrada_e_saida_do_ar/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'O caminho do combustível',
            'codigo' => 'combustivel',
            'descricao' => 'Acompanhe o combustível até a combustão.',
            'ordem' => 3,
            'imagem' => '/images/03_o_caminho_do_combustivel/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'A faísca do motor',
            'codigo' => 'ignicao',
            'descricao' => 'Veja como a ignição inicia a combustão.',
            'ordem' => 4,
            'imagem' => '/images/04_a_faisca_do_motor/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Controlando a temperatura',
            'codigo' => 'arrefecimento',
            'descricao' => 'Aprenda como o motor controla seu calor.',
            'ordem' => 5,
            'imagem' => '/images/05_controlando_a_temperatura/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Lubrificação e proteção',
            'codigo' => 'lubrificacao',
            'descricao' => 'Descubra como o óleo protege o motor.',
            'ordem' => 6,
            'imagem' => '/images/06_lubrificacao_e_protecao/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Energia elétrica no veículo',
            'codigo' => 'eletrica',
            'descricao' => 'Entenda como a eletricidade movimenta o carro.',
            'ordem' => 7,
            'imagem' => '/images/07_energia_eletrica_no_veiculo/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Aumentando a potência',
            'codigo' => 'potencia',
            'descricao' => 'Veja como fazer o motor produzir mais potência.',
            'ordem' => 8,
            'imagem' => '/images/08_aumentado_a_potencia/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Como a potência chega ao asfalto',
            'codigo' => 'transmissao',
            'descricao' => 'Acompanhe a força do motor até as rodas.',
            'ordem' => 9,
            'imagem' => '/images/09_como_a_potencia_chega_ao_asfalto/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Parando o carro',
            'codigo' => 'freios',
            'descricao' => 'Entenda como os freios seguram o movimento.',
            'ordem' => 10,
            'imagem' => '/images/10_parando_o_carro/principal.webp',
        ]);

        Modulo::create([
            'titulo' => 'Suspensão e direção',
            'codigo' => 'suspensao_direcao',
            'descricao' => 'Descubra como o carro se mantém estável e controlável.',
            'ordem' => 11,
            'imagem' => '/images/11_suspensao_e_direcao/principal.webp',
        ]);
    }
}
