<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Age extends Model
{
    use HasFactory;

    protected $fillable = ['value'];

    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }
}
