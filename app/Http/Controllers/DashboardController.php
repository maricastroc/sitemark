<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
    
        $links = Link::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    
        return Inertia::render('Dashboard/Index', [
            'links' => $links,
        ]);
    }
}