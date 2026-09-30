<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\ModuloController;

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

//marca/desmarca os modulos como concluido
Route::middleware('auth:sanctum')->group(function () {
    Route::post(
        '/modulos/{modulo:codigo}/alternar-conclusao',
        [ModuloController::class, 'alternarConclusao']
    );
});