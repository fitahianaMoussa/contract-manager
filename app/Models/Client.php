<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'broker_id',
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
    ];
    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
