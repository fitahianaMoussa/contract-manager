<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ConvertToClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return in_array(Auth::user()->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'spouse_first_name' => 'nullable|string|max:255',
            'spouse_last_name' => 'nullable|string|max:255',
            'spouse_date_of_birth' => 'nullable|string|max:11',
            'spouse_social_security_number' => 'nullable|string|max:255',
            'spouse_email' => 'nullable|email|max:255',
            'spouse_phone' => 'nullable|string|max:100',
            'bank_details',
            'insured_person',
            'regime',
            'is_valid',
            // 'insured_person'=> 'required|string|max:50',
            // 'regime'=> 'required|string|max:255',
        ];
    }
}
