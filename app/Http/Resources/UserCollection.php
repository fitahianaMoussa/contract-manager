<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
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
                'clients',
                'first_name',
                'last_name',
                'email',
                'phone',
                'role',
                'is_active',
                'firm_name',
                'firm_address',
                'broker_id',
            ),
        ];
    }
}
