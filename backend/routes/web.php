<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

//registro
Route::post('/register', [AuthController::class,'register']);
//login
Route::post('/login', [AuthController::class,'login']);
//logout
Route::post('/logout', [AuthController::class,'logout']);




Route::get('/', function () {
    return view('welcome');
});
