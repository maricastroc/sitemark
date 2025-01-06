<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CheckUsername implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $value)) {
            $fail('The username can only contain letters, numbers, underscores, or hyphens.');
        }
    
        if (str_contains($value, ' ')) {
            $fail('The username cannot contain spaces.');
        }
    }
}
