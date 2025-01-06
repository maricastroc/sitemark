<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\User;
use Inertia\Inertia;

class UrlController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(User $user)
    {
        $this->authorize('viewAny', Link::class);

        $userData = $user->only(['name', 'avatar_url', 'username']);

        $links = $user->links()->orderBy('display_order', 'asc')->get();

        return Inertia::render('Url/Index', [
            'user' => $userData,
            'links' => $links,
        ]);
    }
}