<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register/Index');
    }

    public function register(RegisterRequest $request)
    {
        if ($request->attempt()) {
            return response()->json([
                'redirect' => route('login'),
                'message' => 'User successfully registered!',
            ]);
        }
    }
}
