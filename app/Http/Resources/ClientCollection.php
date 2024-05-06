<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->map->only(
                'id',
                'broker',
                'contracts',
                'first_name',
                'last_name',
                'date_of_birth',
                'social_security_number',
                'email',
                'phone',
                'street',
                'city',
                'country',
                'zip_code',
                'spouse_first_name',
                'spouse_last_name',
                'spouse_date_of_birth',
                'spouse_social_security_number',
                'spouse_email',
                'spouse_phone',
                'bank_details',
                'insured_person',
                'regime',
                'is_valid',
            ),
        ];
    }
}
