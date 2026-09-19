<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

//registro
Route::post('/register', [AuthController::class,'register']);





//Login
Route::post('/login', function (Request $request) {
    //manda as credenciais
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
    ]);
    //verifica se é valido
    if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'E-mail ou senha incorretos.',
        ], 422);
    }
    //retorna o usuário e inicia a sessão
    $request->session()->regenerate();
    return response()->json([
        'message' => 'Login realizado com sucesso.',
        'user' => $request->user(),
    ]);
});

//Logout
Route::post('/logout', function (Request $request) {
    Auth::logout();
    //apenas remove os dados da sessão
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json([
        'message' => 'Logout realizado com sucesso.',
    ]);
})->middleware('auth');


Route::get('/', function () {
    return view('welcome');
});
