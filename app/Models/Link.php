<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    /** @use HasFactory<\Database\Factories\LinkFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'url',
        'platform',
        'photo_url',
        'user_id',
        'display_order',
    ];

    /**
     * Create a new link.
     */
    public static function createWithPhoto(array $data, $userId)
    {
        $data['user_id'] = $userId;

        $maxOrder = self::where('user_id', $userId)->max('display_order');

        $data['display_order'] = $maxOrder !== null ? $maxOrder + 1 : 0;

        if (isset($data['photo_url']) && $data['photo_url']->isValid()) {
            $photoUrlPath = $data['photo_url']->store('assets/series', 'public');
            
            $data['photo_url'] = $photoUrlPath;
        }

        return self::create($data);
    }

    /**
     * Update an existing link with a new photo (if provided).
     */
    public static function updateWithPhoto(Link $link, array $data)
    {
        if (isset($data['photo_url']) && $data['photo_url']->isValid()) {
            $photoUrlPath = $data['photo_url']->store('assets/series', 'public');
            $data['photo_url'] = $photoUrlPath;
        }

        $link->update($data);

        return $link;
    }

    /**
     * Move the link one position up.
     */
    public function moveUp()
    {
        $previousLink = self::where('user_id', $this->user_id)
            ->where('display_order', '<', $this->display_order)
            ->orderBy('display_order', 'desc')
            ->first();

        if ($previousLink) {
            $currentOrder = $this->display_order;
            $this->update(['display_order' => $previousLink->display_order]);
            $previousLink->update(['display_order' => $currentOrder]);
        }
    }

    /**
     * Move the link one position down.
     */
    public function moveDown()
    {
        $nextLink = self::where('user_id', $this->user_id)
            ->where('display_order', '>', $this->display_order)
            ->orderBy('display_order', 'asc')
            ->first();

        if ($nextLink) {
            $currentOrder = $this->display_order;
            $this->update(['display_order' => $nextLink->display_order]);
            $nextLink->update(['display_order' => $currentOrder]);
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
