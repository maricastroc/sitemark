<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function() {
    Route::get('/login', [LoginController::class, 'index'])->name('login');

    Route::post('/login', [LoginController::class, 'login']);

    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    
    Route::post('/register', [RegisterController::class, 'register']);
});

Route::middleware('auth')->group(function() {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::post('/logout', LogoutController::class);

    Route::get('/profile', [UserController::class, 'index'])->name('user');

    Route::put('/profile/{user}', [UserController::class, 'update']);

    Route::get('/links/{link}', [LinkController::class, 'show']);

    Route::post('/links', [LinkController::class, 'store']);

    Route::put('/links/{link}', [LinkController::class, 'update']);

    Route::patch('/links/{link}/up', [LinkController::class, 'moveUp']);

    Route::patch('/links/{link}/down', [LinkController::class, 'moveDown']);

    Route::delete('/links/{link}', [LinkController::class, 'destroy']);
});
