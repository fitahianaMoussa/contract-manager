<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = ['broker_id', 'name'];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }
}
