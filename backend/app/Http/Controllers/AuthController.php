<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller{
    public function register(Request $request){
        //fazendo a verificação se os dados são válidos
        $dados = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        //cria o registro
        $user = User::create([
            'name' => $dados['name'],
            'email' => $dados['email'],
            'password' => Hash::make($dados['password']),
        ]);

        //já fica logado
        Auth::login($user);
        $request->session()->regenerate();
        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function login(Request $request){
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
    }

    public function logout(Request $request){
        Auth::logout();
        //apenas remove os dados da sessão
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }
}