<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProspectCollection extends ResourceCollection
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
                'first_name',
                'last_name',
                'date_of_birth',
                'description',
                'status',
                'email',
                'phone',
                'address',
                'city',
                'country',
                'postal_code',
                'broker_id',
            ),
        ];
    }
}
