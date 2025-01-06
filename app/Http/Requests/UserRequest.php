<?php

namespace App\Http\Requests;

use App\Rules\CheckUsername;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignoreModel($this->user())],
            'name' => ['required', 'string'],
            'bio' => ['nullable', 'string'],
            'username' => ['required', 'string', Rule::unique('users')->ignoreModel($this->user()), new CheckUsername],
            'avatar_url' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ];

        if ($this->filled('old_password') || $this->filled('new_password')) {
            $rules['old_password'] = ['required', function ($attribute, $value, $fail) {
                $user = auth()->user();
                if (!Hash::check($value, $user->password)) {
                    return $fail('The old password is incorrect.');
                }
            }];
            
            $rules['new_password'] = ['required', 'string', Password::defaults()];
        }

        return $rules;
    }
}
