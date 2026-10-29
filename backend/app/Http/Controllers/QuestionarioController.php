<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Questionario;
use App\Models\TentativaQuestionario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class QuestionarioController extends Controller
{
    public function registrarTentativa(
        Request $request,
        Questionario $questionario
    ) {
        $dados = $request->validate([
            'nota' => [
                'required',
                'numeric',
                'min:0',
                'max:10',
            ],
            'acertos' => [
                'required',
                'integer',
                'min:0',
            ],
            'erros' => [
                'required',
                'integer',
                'min:0',
            ],
            'percentual' => [
                'required',
                'integer',
                'min:0',
                'max:100',
            ],
            'questoes' => [
                'required',
                'array',
            ],
            'questoes.*.questao_id' => [
                'required',
                'string',
            ],
            'questoes.*.tipo' => [
                'required',
                'string',
            ],
            'questoes.*.pergunta' => [
                'required',
                'string',
            ],
            'questoes.*.resposta' => [
                'required',
            ],
            'questoes.*.resposta_correta' => [
                'nullable',
            ],
            'questoes.*.correta' => [
                'required',
                'boolean',
            ],
        ]);

        $tentativa = DB::transaction(
            function () use (
                $request,
                $questionario,
                $dados
            ) {
                $tentativa =
                    TentativaQuestionario::create([
                        'questionario_id' => $questionario->id,
                        'user_id' => $request->user()->id,
                        'nota' => $dados['nota'],
                        'acertos' => $dados['acertos'],
                        'erros' => $dados['erros'],
                        'percentual' => $dados['percentual'],
                        'concluido_at' => now(),
                    ]);

                foreach ($dados['questoes'] as $questao) {
                    $tentativa->respostas()
                        ->create([
                            'questao_id' => $questao['questao_id'],
                            'tipo' => $questao['tipo'],
                            'pergunta' => $questao['pergunta'],
                            'resposta' => $questao['resposta'],
                            'resposta_correta' => $questao['resposta_correta'] ?? null,
                            'correta' => $questao['correta'],
                        ]);
                }
                return $tentativa;
            }
        );

        return response()->json([
            'message' => 'Tentativa salva com sucesso.',
            'tentativa_id' => $tentativa->id,
        ]);
    }

//=========================================================================

    public function corrigir(
        Request $request,
        Questionario $questionario
    ) {
        $dados = $request->validate([
            'respostas' => ['required', 'array'],
            'respostas.*.questao_id' => ['required', 'string'],
            'respostas.*.resposta' => ['required'],
        ]);
        $questoes = $questionario
            ->questoes()
            ->orderBy('ordem')
            ->get()
            ->keyBy('codigo');
        $respostasRecebidas = collect($dados['respostas']);
        $idsRecebidos = $respostasRecebidas
            ->pluck('questao_id');

        //impede 2 respostas na mesma questão
        if ($idsRecebidos->count() !== $idsRecebidos->unique()->count()) {
            return response()->json([
                'message' => 'Existem questões respondidas mais de uma vez.'], 422);
        }

        //confirma que todas as questões foram respondidas
        $faltantes = $questoes
            ->keys()
            ->diff($idsRecebidos);
        if ($faltantes->isNotEmpty()) {
            return response()->json([
                'message' => 'O questionário não foi completamente respondido.'], 422);
        }

        //impede enviar ID de questões de outros formulários
        $invalidas = $idsRecebidos ->diff($questoes->keys());
        if ($invalidas->isNotEmpty()) {
            return response()->json([
                'message' => 'Uma ou mais questões não pertencem a este questionário.'], 422);
        }

        $resultados = [];
        foreach ($respostasRecebidas as $item) {
            $questao = $questoes->get($item['questao_id']);
            $resposta = $item['resposta'];

            $opcoes = $questao->opcoes ?? [];
            $valoresResposta = is_array($resposta)
                ? $resposta
                : [$resposta];

            foreach ($valoresResposta as $valor) {
                if (!array_key_exists($valor, $opcoes)) {
                    return response()->json([
                        'message' => "Resposta inválida para a questão '{$questao->codigo}'."], 422);
                }
            }

            //correção
            $respostaCorreta = $questao->resposta_correta;
            $correta = $this->respostasIguais($resposta, $respostaCorreta);
            $respostaTexto = $this->respostaTexto($resposta, $opcoes);
            
            $respostaCorretaTexto = null;
            if ($questao->tipo === 'multipla-escolha') {
                $respostaCorretaTexto = $this->respostaTexto($respostaCorreta, $opcoes);
            }

            //-------------------------------------------------------

            $resultados[] = [
                'id' => $questao->codigo,
                'tipo' => $questao->tipo,
                'pergunta' => $questao->pergunta,
                'correta' => $correta,
                'respostaTexto' => $respostaTexto,
                'respostaCorretaTexto' => $respostaCorretaTexto,
                'explicacao' => $questao->explicacao,
            ];
        }

        $total = count($resultados);
        $acertos = collect($resultados)
            ->where('correta', true)
            ->count();
        $erros = $total - $acertos;
        $percentual = $total > 0
            ? round(($acertos / $total) * 100)
            : 0;
        $nota = $total > 0
            ? round(($acertos / $total) * 10, 1)
            : 0;

        $resultado = [
            'total' => $total,
            'acertos' => $acertos,
            'erros' => $erros,
            'percentual' => $percentual,
            'nota' => $nota,
            'questoes' => $resultados,
        ];

        //se estiver logado
        $usuario = Auth::guard('sanctum')->user();
        if ($usuario) {
            $this->salvarTentativa(
                $questionario,
                $usuario->id,
                $resultado,
                $respostasRecebidas,
                $questoes
            );
        }

        return response()->json([
            'resultado' => $resultado,
            'salvo' => $usuario !== null,
        ]);
    }

    private function respostasIguais(
        mixed $resposta,
        mixed $correta
    ): bool {
        if (is_array($resposta) && is_array($correta)) {
            sort($resposta);
            sort($correta);
            return $resposta === $correta;
        }

        return (string) $resposta === (string) $correta;
    }

    private function respostaTexto(
        mixed $resposta,
        array $opcoes
    ): string {
        $respostas = is_array($resposta)
            ? $resposta
            : [$resposta];
        return collect($respostas)->map(
            fn ($valor) => $opcoes[$valor] ?? $valor
        )->implode(', ');
    }

    private function salvarTentativa(
        Questionario $questionario,
        int $usuarioId,
        array $resultado,
        $respostasRecebidas,
        $questoes,
    ): void {
        DB::transaction(function () use (
            $questionario,
            $usuarioId,
            $resultado,
            $respostasRecebidas,
            $questoes
        ) {
            $tentativa = TentativaQuestionario::create([
                'questionario_id' => $questionario->id,
                'user_id' => $usuarioId,
                'nota' => $resultado['nota'],
                'acertos' => $resultado['acertos'],
                'erros' => $resultado['erros'],
                'percentual' => $resultado['percentual'],
                'concluido_at' => now(),
            ]);

            foreach ($respostasRecebidas as $item) {
                $questao = $questoes->get($item['questao_id']);
                $resultadoQuestao = collect($resultado['questoes'])->firstWhere(
                    'id',
                    $questao->codigo
                );

                $tentativa->respostas()->create([
                    'questao_id' => $questao->codigo,
                    'tipo' => $questao->tipo,
                    'pergunta' => $questao->pergunta,
                    'resposta' => $item['resposta'],
                    'resposta_correta' => $questao->resposta_correta,
                    'correta' => $resultadoQuestao['correta'],
                ]);
            }
        });
    }

    public function ultimaTentativa(
        Request $request,
        Questionario $questionario
    ) {
        $tentativa = TentativaQuestionario::with('respostas')
            ->where('questionario_id', $questionario->id)
            ->where('user_id', $request->user()->id)
            ->latest('concluido_at')
            ->first();
        if (!$tentativa) {
            return response()->json(['tentativa' => null]);
        }

        $resultadoQuestoes = [];
        $questoes = $questionario
            ->questoes()
            ->get()
            ->keyBy('codigo');
        $respostas = $tentativa->respostas
            ->sortBy(function ($resposta) use ($questoes) {
                return $questoes
                    ->get($resposta->questao_id)
                    ?->ordem ?? PHP_INT_MAX;
            });

        foreach ($respostas as $resposta) {
            $questao = $questionario->questoes()
                ->where('codigo', $resposta->questao_id)
                ->first();
            $opcoes = $questao?->opcoes ?? [];
            $respostaValor = $resposta->resposta;

            $respostaTexto = $this->respostaTexto(
                $respostaValor,
                $opcoes
            );
            $respostaCorretaTexto = null;

            if ($resposta->tipo === 'multipla-escolha') {
                $respostaCorretaTexto = $this->respostaTexto(
                    $resposta->resposta_correta,
                    $opcoes
                );
            }

            $resultadoQuestoes[] = [
                'id' => $resposta->questao_id,
                'tipo' => $resposta->tipo,
                'pergunta' => $resposta->pergunta,
                'correta' => $resposta->correta,
                'respostaTexto' => $respostaTexto,
                'respostaCorretaTexto' => $respostaCorretaTexto,
                'explicacao' => $questao?->explicacao,
            ];
        }

        return response()->json([
            'tentativa' => [
                'id' => $tentativa->id,
                'resultado' => [
                    'total' => $tentativa->acertos + $tentativa->erros,
                    'acertos' => $tentativa->acertos,
                    'erros' => $tentativa->erros,
                    'percentual' => $tentativa->percentual,
                    'nota' => $tentativa->nota,
                    'questoes' => $resultadoQuestoes,
                ],
            ],
        ]);
    }

    public function mostrar(
        Questionario $questionario
    ) {
        $questoes = $questionario
            ->questoes()
            ->orderBy('ordem')
            ->get();

        return response()->json([
            'id' => $questionario->id,
            'codigo' => $questionario->codigo,
            'titulo' => $questionario->titulo,
            'questoes' => $questoes->map(function ($questao) {
                return [
                    'codigo' => $questao->codigo,
                    'tipo' => $questao->tipo,
                    'pergunta' => $questao->pergunta,
                    'destaque' => $questao->destaque,
                    'opcoes' => $questao->opcoes,
                    'ordem' => $questao->ordem,
                    'modelo_3d' => $questao->modelo_3d,
                    'grupo_3d' => $questao->grupo_3d,
                ];
            }),
        ]);
    }
}
