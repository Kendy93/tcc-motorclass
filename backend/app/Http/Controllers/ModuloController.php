<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\RecompensaUsuario;
use App\Models\Modulo;

class ModuloController extends Controller
{
    //todos os módulos
    public function index(Request $request) {
        $usuario = $request->user();
        $modulos = Modulo::orderBy('ordem')->get();
        //se tiver algum usuário, marca os finalizados
        if ($usuario) {
            $concluidos = $usuario->modulos()
                ->whereNotNull('completed_at')
                ->pluck('modulo_id')
                ->toArray();
            $modulos->each(function ($modulo) use ($concluidos) {
                $modulo->concluido = in_array(
                    $modulo->id,
                    $concluidos
                );
            });
        }
        return response()->json($modulos);
    }

    public function show(Modulo $modulo) {
        return response()->json($modulo);
    }

    //marca como finalizado
    public function concluir(Modulo $modulo, Request $request) {
        $usuario = $request->user();

        // verifica se o módulo já estava concluído antes desta chamada.
        $jaEstavaConcluido = $usuario->modulos()
            ->where('modulos.id', $modulo->id)
            ->wherePivotNotNull('completed_at')
            ->exists();
        // registra a conclusão somente se ainda não estava concluído.
        if (!$jaEstavaConcluido) {
            $usuario->modulos()->syncWithoutDetaching([
                $modulo->id => ['completed_at' => now(),],
            ]);
        }
        // conta os módulos efetivamente concluídos.
        $modulosConcluidos = $usuario->modulos()
            ->wherePivotNotNull('completed_at')
            ->count();
        $totalModulos = Modulo::count();
        // só é verdadeiro quando esta ação conclui o último módulo pendente.
        $finalizouTodosAgora =
            !$jaEstavaConcluido
            && $totalModulos > 0
            && $modulosConcluidos >= $totalModulos;

        return response()->json([
            'message' => 'Módulo concluído.',
            'progresso' => [
                'modulos_concluidos' => $modulosConcluidos,
                'total_modulos' => $totalModulos,
                'finalizou_todos_agora' => $finalizouTodosAgora,
            ],
        ]);
    }

    //para permitir que o módulo seja "resetado"
    public function alternarConclusao(Request $request, Modulo $modulo){
        $usuario = $request->user();
        $concluido = false;
        $acabouDeConcluir = false;

        DB::transaction(function () use (
            $usuario,
            $modulo,
            &$concluido,
            &$acabouDeConcluir
        ) {
            // busca o módulo e verifica seu estado atual
            $relacao = $usuario->modulos()
                ->where('modulos.id', $modulo->id)
                ->first();
            $jaConcluido =
                $relacao &&
                $relacao->pivot->completed_at !== null;

            // se já estava concluído, remove a conclusão
            if ($jaConcluido) {
                $usuario->modulos()->updateExistingPivot(
                    $modulo->id,
                    ['completed_at' => null]
                );
                // desequipa a recompensa do módulo.
                RecompensaUsuario::where('user_id', $usuario->id)
                    ->where('modulo_id', $modulo->id)
                    ->update(['equipada' => false]);
                $concluido = false;
                return;
            }

            // conclui o módulo.
            $usuario->modulos()->syncWithoutDetaching([
                $modulo->id => [
                    'completed_at' => now(),
                ],
            ]);

            // registra se esta ação acabou de concluir o módulo.
            $acabouDeConcluir = true;
            $concluido = true;
            // libera e equipa a recompensa correspondente, se existir.
            $recompensa = config("recompensas.{$modulo->codigo}");
            if ($recompensa) {
                RecompensaUsuario::updateOrCreate(
                    [
                        'user_id' => $usuario->id,
                        'recompensa_codigo' => $recompensa['codigo'],
                    ],
                    [
                        'modulo_id' => $modulo->id,
                        'equipada' => true,
                    ]
                );
            }
        });

        // conta os módulos que possuem uma conclusão registrada
        $modulosConcluidos = $usuario->modulos()
            ->wherePivotNotNull('completed_at')
            ->count();
        // conta os módulos cadastrados na plataforma
        $totalModulos = Modulo::count();
        // só é verdadeiro quando esta ação conclui o último módulo pendente
        $finalizouTodosAgora =
            $acabouDeConcluir &&
            $totalModulos > 0 &&
            $modulosConcluidos >= $totalModulos;

        if ($finalizouTodosAgora) {
            $certificado = $usuario->certificado()->firstOrCreate(
                [
                    'user_id' => $usuario->id,
                ],
                [
                    'codigo' => (string) \Illuminate\Support\Str::uuid(),
                    'nome_titular' => $usuario->name,
                    'curso' => 'MOTORCLASS',
                    'emitido_em' => now(),
                ]
            );
            $certificadoEmitidoAgora = $certificado->wasRecentlyCreated;
        }
        // recupera o certificado caso já exista.
        $certificado = $certificado ?? $usuario->certificado()->first();

        return response()->json([
            'concluido' => $concluido,
            'message' => $concluido
                ? 'Módulo concluído.'
                : 'Módulo marcado como não concluído.',
            'progresso' => [
                'modulos_concluidos' => $modulosConcluidos,
                'total_modulos' => $totalModulos,
                'finalizou_todos_agora' => $finalizouTodosAgora,
            ],
            'certificado' => $certificado ? [
                'codigo' => $certificado->codigo,
                'nome_titular' => $certificado->nome_titular,
                'curso' => $certificado->curso,
                'emitido_em' => $certificado->emitido_em,
                'emitido_agora' => $certificadoEmitidoAgora,
            ] : null,
        ]);
    }

    //função para carregar a garagem, talvez mover para o próprio controller futuramente
    public function garagem(Request $request){
        $usuario = $request->user();
        $recompensas = config('recompensas', []);
        $modulos = $usuario->modulos()
            ->withPivot('completed_at')
            ->get()
            ->keyBy('codigo');
        $registros = RecompensaUsuario::where(
            'user_id',
            $usuario->id
        )
            ->get()
            ->keyBy('recompensa_codigo');
        $resultado = [];

        foreach ($recompensas as $moduloCodigo => $recompensa) {
            $modulo = $modulos->get($moduloCodigo);
            if (!$modulo) {
                $resultado[] = [
                    'codigo' => $recompensa['codigo'],
                    'nome' => $recompensa['nome'],
                    'objeto' => $recompensa['objeto'],
                    'desbloqueada' => false,
                    'equipada' => false,
                    'modulo' => $moduloCodigo,
                ];
                continue;
            }
            $desbloqueada = $modulo->pivot->completed_at !== null;
            $registro = $registros->get($recompensa['codigo']);

            //se desmarcar o módulo
            if (!$desbloqueada) {
                if ($registro && $registro->equipada) {
                    $registro->update(['equipada' => false]);
                }
                $resultado[] = [
                    'codigo' => $recompensa['codigo'],
                    'nome' => $recompensa['nome'],
                    'objeto' => $recompensa['objeto'],
                    'desbloqueada' => false,
                    'equipada' => false,
                    'modulo' => $moduloCodigo,
                ];
                continue;
            }

            //já tava concluído mas não tinha ligação com recompensa
            if (!$registro) {
                $registro = RecompensaUsuario::create([
                    'user_id' => $usuario->id,
                    'modulo_id' => $modulo->id,
                    'recompensa_codigo' =>
                        $recompensa['codigo'],
                    'equipada' => true,
                ]);
            }

            $resultado[] = [
                'codigo' => $recompensa['codigo'],
                'nome' => $recompensa['nome'],
                'objeto' => $recompensa['objeto'],
                'desbloqueada' => true,
                'equipada' => $registro->equipada,
                'modulo' => $moduloCodigo,
            ];
        }
        return response()->json($resultado);
    }

    //equipa/desequipa a peça
    public function alternarRecompensa(Request $request, string $recompensa) {
        $configuracao = collect(config('recompensas'))
            ->first(fn ($item) => $item['codigo'] === $recompensa);
        if (!$configuracao) {
            return response()->json(['message' => 'Recompensa não encontrada.'], 404);
        }

        $moduloCodigo = collect(config('recompensas'))
            ->search(fn ($item) => $item['codigo'] === $recompensa);
        $modulo = Modulo::where('codigo', $moduloCodigo)->firstOrFail();

        $usuario = $request->user();

        $relacao = $usuario->modulos()
            ->where('modulo_id', $modulo->id)
            ->first();

        if (!$relacao || $relacao->pivot->completed_at === null) {
            return response()->json([
                'message' => 'Essa recompensa ainda está bloqueada.'], 403);
        }

        $registro = RecompensaUsuario::firstOrCreate(
            [
                'user_id' => $usuario->id,
                'recompensa_codigo' => $recompensa,
            ],
            [
                'modulo_id' => $modulo->id,
                'equipada' => true,
            ]
        );
        $registro->update(['equipada' => !$registro->equipada,]);

        return response()->json([
            'codigo' => $registro->recompensa_codigo,
            'equipada' => $registro->equipada,
        ]);
    }
}
