<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UrlController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(string $username)
    {
        $this->authorize('viewAny', Link::class);
        
        $user = User::where('username', $username)->firstOrFail();

        $userData = $user->only(['name', 'avatar_url', 'username']);

        $links = $user->links()->orderBy('display_order', 'asc')->get();

        return Inertia::render('Url/Index', [
            'user' => $userData,
            'links' => $links,
        ]);
    }
}