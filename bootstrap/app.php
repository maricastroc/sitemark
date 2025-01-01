<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Remover ou comentar os middlewares que não deseja carregar
        // Aqui estamos removendo os middlewares HandleInertiaRequests e AddLinkHeadersForPreloadedAssets
        // Se não quiser nenhum middleware do tipo "web", basta comentar ou remover a linha abaixo
        $middleware->web(append: [
            // \App\Http\Middleware\HandleInertiaRequests::class,
            // \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Caso queira adicionar outros middlewares, basta configurá-los aqui
        // Exemplo:
        // $middleware->web(append: [
        //    \App\Http\Middleware\SomeOtherMiddleware::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
