<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'street' => $this->street,
            'city' => $this->city,
            'country' => $this->country,
            'description' => $this->description,
            'zip_code' => $this->zip_code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'broker' => $this->broker,
            'products' => $this->products()->orderBy('name')->get(),
        ];
    }
}
