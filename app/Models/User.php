<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Create a new user with hash password.
     *
     * @param array $data
     * @return \App\Models\User
     */
    public static function createUser(array $data)
    {
        return self::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Update user with a new photo (if provided).
     */
    public static function updateWithPhoto(array $data, User $user)
    {
        if (isset($data['new_password'])) {
            $data['new_password'] = Hash::make($data['new_password']);
        }

        if (isset($data['avatar_url']) && $data['avatar_url']->isValid()) {
            $photoUrlPath = $data['avatar_url']->store('assets/users', 'public');
            $data['avatar_url'] = $photoUrlPath;
        } else {
            $data['avatar_url'] = $data['avatar_url'] ?? $user->avatar_url;
        }

        return $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'bio' => $data['bio'],
            'avatar_url' => $data['avatar_url'],
            'password' => $data['new_password'] ?? $user->password,
        ]);
    }

    public function links()
    {
        return $this->hasMany(Link::class);
    }
}
