<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CompanyCollection extends ResourceCollection
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
                'products',
                'name',
                'email',
                'phone',
                'street',
                'city',
                'country',
                'description',
                'zip_code',
            ),
        ];
    }
}
