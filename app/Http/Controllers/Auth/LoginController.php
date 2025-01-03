<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login/Index');
    }

    public function login(LoginRequest $request)
    {
        if ($request->attempt()) {
            return response()->json([
                'redirect' => route('dashboard')
            ]);
        }

        return response()->json([
            'errors' => ['message' => 'Invalid credentials.'],
        ], 422);
        }
}

