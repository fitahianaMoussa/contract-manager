<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prospect extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'social_security_number',
    ];

    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }
}
