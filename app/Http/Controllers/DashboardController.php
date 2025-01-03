<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $links = Link::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard/Index', [
            'links' => $links,
        ]);
    }
}