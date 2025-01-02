<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DashboardController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/home', function () {
    return Inertia::render('Dashboard/Index');
});

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::post('/login', [LoginController::class, 'login'])->name('login');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth')->name('dashboard');

