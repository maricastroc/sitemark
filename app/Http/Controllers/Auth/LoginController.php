<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login/Index');
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if ($user && Hash::check($validated['password'], $user->password)) {
            auth()->login($user);
            return response()->json([
                'redirect' => route('dashboard')
            ]);
        }

        return response()->json([
            'errors' => ['message' => 'Invalid credentials.'],
        ], 422);
        }
}

