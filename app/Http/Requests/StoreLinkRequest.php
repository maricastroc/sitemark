<?php

namespace App\Http\Requests;

use App\Models\Link;
use Illuminate\Foundation\Http\FormRequest;

class StoreLinkRequest extends FormRequest
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
        return [
            'url' => ['required', 'url', 'min:3'],
            'name' => ['required', 'string', 'min:3'],
            'platform' => ['required', 'string', 'min:3'],
            'photo_url' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Validação da imagem
        ];
    }
    
    public function attempt(): bool
    {
        if ($this->hasFile('photo_url') && $this->file('photo_url')->isValid()) {
            $photoUrlPath = $this->file('photo_url')->store('assets/series', 'public');
    
            Link::query()->create([
                'name' => $this->validated()['name'],
                'platform' => $this->validated()['platform'],
                'url' => $this->validated()['url'],
                'photo_url' => $photoUrlPath,
            ]);
        } else {
            Link::query()->create($this->validated());
        }
    
        return true;
    }
}
