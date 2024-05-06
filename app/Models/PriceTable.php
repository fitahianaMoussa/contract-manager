<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceTable extends Model
{
    use HasFactory;

    protected $fillable = ['value', 'age_id', 'option_id', 'zone_id', 'broker_id'];

    public function age()
    {
        return $this->belongsTo(Age::class, 'age_id');
    }

    public function option()
    {
        return $this->belongsTo(Option::class, 'option_id');
    }

    public function zone()
    {
        return $this->belongsTo(Zone::class, 'zone_id');
    }

    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }
}
