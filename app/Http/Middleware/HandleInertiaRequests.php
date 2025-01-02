<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * O template raiz que é carregado na primeira visita à página.
     */
    protected $rootView = 'app'; // Certifique-se de que essa view existe em resources/views

    /**
     * Determina a versão atual dos assets.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define os dados que são compartilhados por padrão.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'errors' => function () use ($request) {
                return $request->session()->get('errors') 
                    ? $request->session()->get('errors')->getBag('default')->toArray() 
                    : [];
            },
        ]);
    }
}
