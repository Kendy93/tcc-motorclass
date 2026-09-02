<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Modulo;

class ModuloController extends Controller
{
    //todos os módulos
    public function index(){
        return response()->json(
            Modulo::orderBy('ordem')->get()
        );
    }

    public function show(Modulo $modulo){
        return response()->json($modulo);
    }
}
