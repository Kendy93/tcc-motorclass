<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Modulo;
use App\Models\Questionario;
use App\Models\QuestaoQuestionario;

class QuestionarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questionarios = [
            [
                'modulo' => 'freios',
                'codigo' => 'quest-freios',
                'titulo' => 'Questionário — Sistema de frenagem',
                'questoes' => [
                    //identificação 3d
                    [
                        'ordem' => 1,
                        'codigo' => 'identificacao-partes-freio:tambor',
                        'tipo' => 'identificacao-3d',
                        'pergunta' => 'Identifique o tambor de freio.',
                        'resposta_correta' => 'tambor',
                        'explicacao' => null,
                        'modelo_3d' => 'sistemaCompleto',
                        'grupo_3d' => 'identificacao-partes-freio',
                        'opcoes' => [
                            'cilindro_mestre' => 'Cilindro mestre',
                            'hidrovacuo' => 'Hidrovácuo',
                            'linhas_freio' => 'Linhas de freio',
                            'pedal_freio' => 'Pedal do freio',
                            'reservatorio_freio' => 'Reservatório de fluido de freio',
                            'molas' => 'Molas de retorno',
                            'pistao' => 'Pistão',
                            'regulador' => 'Regulador',
                            'sapatas' => 'Sapatas de freio',
                            'tambor' => 'Tambor de freio',
                            'tampa_traseira' => 'Tampa traseira',
                            'tambor_completo' => 'Freio a tambor',
                            'disco' => 'Disco de freio',
                            'disco_completo' => 'Freio a disco',
                            'pastilha' => 'Pastilhas',
                            'pinca' => 'Pinças de freio',
                            'tampa_tras' => 'Tampa traseira',
                        ],
                    ],
                    [
                        'ordem' => 2,
                        'codigo' => 'identificacao-partes-freio:pastilha',
                        'tipo' => 'identificacao-3d',
                        'pergunta' => 'Identifique a pastilha de freio.',
                        'resposta_correta' => 'pastilha',
                        'explicacao' => null,
                        'modelo_3d' => 'sistemaCompleto',
                        'grupo_3d' => 'identificacao-partes-freio',
                        'opcoes' => [
                            'cilindro_mestre' => 'Cilindro mestre',
                            'hidrovacuo' => 'Hidrovácuo',
                            'linhas_freio' => 'Linhas de freio',
                            'pedal_freio' => 'Pedal do freio',
                            'reservatorio_freio' => 'Reservatório de fluido de freio',
                            'molas' => 'Molas de retorno',
                            'pistao' => 'Pistão',
                            'regulador' => 'Regulador',
                            'sapatas' => 'Sapatas de freio',
                            'tambor' => 'Tambor de freio',
                            'tampa_traseira' => 'Tampa traseira',
                            'tambor_completo' => 'Freio a tambor',
                            'disco' => 'Disco de freio',
                            'disco_completo' => 'Freio a disco',
                            'pastilha' => 'Pastilhas',
                            'pinca' => 'Pinças de freio',
                            'tampa_tras' => 'Tampa traseira',
                        ],
                    ],
                    [
                        'ordem' => 3,
                        'codigo' => 'identificacao-partes-freio:hidrovacuo',
                        'tipo' => 'identificacao-3d',
                        'pergunta' => 'Identifique o hidrovácuo.',
                        'resposta_correta' => 'hidrovacuo',
                        'explicacao' => null,
                        'modelo_3d' => 'sistemaCompleto',
                        'grupo_3d' => 'identificacao-partes-freio',
                        'opcoes' => [
                            'cilindro_mestre' => 'Cilindro mestre',
                            'hidrovacuo' => 'Hidrovácuo',
                            'linhas_freio' => 'Linhas de freio',
                            'pedal_freio' => 'Pedal do freio',
                            'reservatorio_freio' => 'Reservatório de fluido de freio',
                            'molas' => 'Molas de retorno',
                            'pistao' => 'Pistão',
                            'regulador' => 'Regulador',
                            'sapatas' => 'Sapatas de freio',
                            'tambor' => 'Tambor de freio',
                            'tampa_traseira' => 'Tampa traseira',
                            'tambor_completo' => 'Freio a tambor',
                            'disco' => 'Disco de freio',
                            'disco_completo' => 'Freio a disco',
                            'pastilha' => 'Pastilhas',
                            'pinca' => 'Pinças de freio',
                            'tampa_tras' => 'Tampa traseira',
                        ],
                    ],
                    //multipla escolha
                    [
                        'ordem' => 4,
                        'codigo' => 'energia-cinetica',
                        'tipo' => 'multipla-escolha',
                        'pergunta' => 'No geral, o que acontece com a energia cinética do carro durante uma frenagem?',
                        'resposta_correta' => 'b',
                        'explicacao' => 'A energia cinética não pode apenas sumir quando o motorista freia. Os componentes do sistema de freios utilizam o atrito para se opor ao movimento das rodas, transformando a energia cinética principalmente em calor.',
                        'opcoes' => [
                            'a' => 'Ela é armazenada na bateria.',
                            'b' => 'Ela é transformada principalmente em calor pelo atrito.',
                            'c' => 'Ela desaparece quando o pedal é pressionado.',
                        ],
                        'modelo_3d' => null,
                        'grupo_3d' => null,
                    ],
                    [
                        'ordem' => 5,
                        'codigo' => 'funcao-cilindro-mestre',
                        'tipo' => 'multipla-escolha',
                        'pergunta' => 'Qual é a principal função do cilindro mestre no sistema de freios?',
                        'resposta_correta' => 'a',
                        'explicacao' => 'Ao pisar no pedal, uma articulação empurra o pistão dentro do cilindro mestre. Esse pistão pressiona o fluido, fazendo com que ele percorra as linhas de freio até chegar às partes responsáveis por gerar o atrito nas rodas.',
                        'opcoes' => [
                            'a' => 'Transformar a pressão feita no pedal em pressão hidráulica no fluido.',
                            'b' => 'Resfriar os discos de freio.',
                            'c' => 'Armazenar o fluido de freio utilizado.',
                        ],
                        'modelo_3d' => null,
                        'grupo_3d' => null,
                    ],
                    [
                        'ordem' => 6,
                        'codigo' => 'funcao-fluido',
                        'tipo' => 'multipla-escolha',
                        'pergunta' => 'Por que o fluido de freio é utilizado em um sistema hidráulico?',
                        'resposta_correta' => 'b',
                        'explicacao' => 'Quando o pedal é pressionado, o cilindro mestre empurra o fluido pelas linhas de freio. Como o fluido praticamente não muda de volume quando submetido à pressão, ele consegue transmitir essa força até os freios localizados nas rodas.',
                        'opcoes' => [
                            'a' => 'Porque ele é comprimido facilmente e aumenta a força aplicada.',
                            'b' => 'Porque ele transmite a pressão pelo sistema com pouca compressão.',
                            'c' => 'Porque ele lubrifica diretamente os discos e as pastilhas.',
                        ],
                        'modelo_3d' => null,
                        'grupo_3d' => null,
                    ],
                    [
                        'ordem' => 7,
                        'codigo' => 'dif-disco-tambor',
                        'tipo' => 'multipla-escolha',
                        'pergunta' => 'Qual é a principal diferença entre um freio a disco e um freio a tambor?',
                        'resposta_correta' => 'c',
                        'explicacao' => 'No freio a tambor, as sapatas ficam dentro de um tambor que gira junto com a roda. Quando o freio é acionado, elas são pressionadas contra a parte interna do tambor, criando o atrito necessário para diminuir o movimento. Já no freio a disco, pastilhas são pressionadas contra um disco que gira junto com a roda.',
                        'opcoes' => [
                            'a' => 'O freio a disco utiliza óleo de motor, enquanto o tambor utiliza fluido de freio.',
                            'b' => 'O freio a disco é usado apenas na dianteira, enquanto o freio a tambor fica sempre na traseira dos veículos.',
                            'c' => 'O freio a disco utiliza uma pastilha pressionada contra um disco, enquanto o tambor utiliza sapatas que atuam contra uma superfície interna do tambor.',
                        ],
                        'modelo_3d' => null,
                        'grupo_3d' => null,
                    ],
                ],
            ],
        ];

        foreach ($questionarios as $dados) {
            $modulo = Modulo::where('codigo', $dados['modulo'])->first();
            if (!$modulo) {
                $this->command->warn("Módulo '{$dados['modulo']}' não encontrado.");
                continue;
            }

            $questionario = Questionario::updateOrCreate(
                [
                    'codigo' => $dados['codigo'],
                ],
                [
                    'modulo_id' => $modulo->id,
                    'titulo' => $dados['titulo'],
                ]
            );

            foreach (
                $dados['questoes']
                as $questao
            ) {
                QuestaoQuestionario::updateOrCreate(
                    [
                        'questionario_id' => $questionario->id,
                        'codigo' => $questao['codigo'],
                    ],
                    [
                        'tipo' => $questao['tipo'],
                        'pergunta' => $questao['pergunta'],
                        'resposta_correta' => $questao['resposta_correta'],
                        'explicacao' => $questao['explicacao'] ?? null,
                        'opcoes' => $questao['opcoes'] ?? null,
                        'ordem' => $questao['ordem'],
                        'modelo_3d' => $questao['modelo_3d'] ?? null,
                        'grupo_3d' => $questao['grupo_3d'] ?? null,
                    ]
                );
            }
        }
    }
}
