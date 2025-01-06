<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $this->authorize('viewAny', Link::class);

        $links = $user->links()->orderBy('display_order', 'asc')->get();

        $links->each(function ($link, $index) use ($links) {
            $link->is_last = $index === $links->count() - 1;
            $link->is_first = $index === 0;
        });

        return Inertia::render('Dashboard/Index', [
            'links' => $links,
        ]);
    }
}