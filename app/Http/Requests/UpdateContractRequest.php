<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContractRequest extends FormRequest
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
            'reference' => 'required|string|max:100',
            'client_id' => 'required|integer',
            'product_id' => 'required|integer',
            'option_id' => 'required|integer',
            'payment_frequency' => 'required|string',
            'description' => 'nullable|string|max:255',
            'start_date' => 'required',
            'end_date' => 'required',
        ];
    }
}
