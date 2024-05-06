<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreClientRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|string',
            'social_security_number' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:100',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:10|min:4',
            'country' => 'required|string|max:100',
            'zip_code' => 'required|string|max:6',
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
