<?php

namespace App\Http\Controllers;

use App\Http\Requests\LinkRequest;
use App\Models\Link;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LinkController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(LinkRequest $request)
    {
        try {
            $this->authorize('create', Link::class);

            $userId = auth()->id();
            
            $data = $request->validated();
            
            Link::createWithPhoto($data, $userId);
            
            return response()->json([
                'redirect' => route('dashboard'),
                'message' => 'Link successfully created!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create link. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        try {
            $this->authorize('view', $link);

            return response()->json([
                'link' => $link,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LinkRequest $request, Link $link)
    {
        $this->authorize('update', $link);

        $data = $request->validated();

        Link::updateWithPhoto($link, $data);
    
        return response()->json([
            'redirect' => route('dashboard'),
            'message' => 'Link successfully updated!',
            'link' => $link,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        try {
            $link->delete();
    
            return response()->json([
                'redirect' => route('dashboard'),
                'message' => 'Link successfully deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete link. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function moveUp(Link $link)
    {
        try {
            $link->moveUp();

            return response()->json([
                'redirect' => route('dashboard'),
                'message' => 'Link moved up successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to move link up. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Move the specified link one position down.
     */
    public function moveDown(Link $link)
    {
        try {
            $link->moveDown();

            return response()->json([
                'redirect' => route('dashboard'),
                'message' => 'Link moved down successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to move link down. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
