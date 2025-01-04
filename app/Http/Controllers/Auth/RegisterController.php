<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register/Index');
    }

    public function register(RegisterRequest $request)
    {
        $user = User::createUser($request->validated());

        Auth::login($user);

        return response()->json([
            'redirect' => route('dashboard'),
            'message' => 'User successfully registered and logged in!',
        ]);
    }
}
