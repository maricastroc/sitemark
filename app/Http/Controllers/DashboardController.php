<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $links = $user->links()->orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard/Index', [
            'links' => $links,
        ]);
    }
}