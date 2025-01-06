<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Profile/Index', [
            'user' => $user,
        ]);
    }

        /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $data = $request->validated();

        User::updateWithPhoto($data, $user);
    
        return response()->json([
            'redirect' => route('dashboard'),
            'message' => 'User successfully updated!',
            'user' => $user,
        ]);
    }
}
