<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Auth/Login/Index');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        return response()->json(['message' => 'Form submitted successfully!']);
    }
}