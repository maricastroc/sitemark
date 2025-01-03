<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class LogoutController extends Controller
{
    public function __invoke()
    {
        auth()?->logout();

        if (session() !== null) {
            session()?->invalidate();
        }

        return to_route('login');
    }
}