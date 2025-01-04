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
    ];

    /**
     * Create a new link.
     */
    public static function createWithPhoto(array $data, $userId)
    {
        $data['user_id'] = $userId;

        if (isset($data['photo_url']) && $data['photo_url']->isValid()) {
            $photoUrlPath = $data['photo_url']->store('assets/series', 'public');
            
            $data['photo_url'] = $photoUrlPath;
        }

        return self::create($data);
    }
}
