<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        $request->user()->modulos()->syncWithoutDetaching([
            $modulo->id => [
                'completed_at' => now(),
            ],
        ]);
        return response()->json([
            'message' => 'Módulo concluído.',
        ]);
    } 
}
