<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\ModuloController;
use App\Http\Controllers\QuestionarioController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/test', function (): JsonResponse {
    return response()->json([
        'message'=>'Laravel conectado',
    ]);
});

Route::get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
    ]);
})->middleware('auth:sanctum');


Route::get('/modulos', [ModuloController::class, 'index']);
Route::get('/modulos/{modulo}', [ModuloController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    //faz a montagem das garagens e finaliza modulos
    Route::get(
        '/garagem', [ModuloController::class, 'garagem']
    );
    Route::post(
        '/garagem/{recompensa}/alternar', [ModuloController::class, 'alternarRecompensa']
    );
    Route::post(
        '/modulos/{modulo:codigo}/alternar-conclusao', [ModuloController::class, 'alternarConclusao']
    );
    
    Route::post(
        '/questionarios/{questionario:codigo}/tentativas', [QuestionarioController::class, 'registrarTentativa']
    );
    Route::get(
        '/questionarios/{questionario:codigo}/ultima-tentativa', [QuestionarioController::class, 'ultimaTentativa']
    );
});

Route::post(
    '/questionarios/{questionario:codigo}/corrigir', [QuestionarioController::class, 'corrigir']
);