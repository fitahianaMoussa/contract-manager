<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class UpdateBrokerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return in_array(Auth::user()->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'firm_address' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'firm_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'is_active' => 'required|boolean',
        ];
    }
}
