<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'client_id',
        'product_id',
        'amount',
        'administration_fees',
        'start_date',
        'end_date',
        'due_date',
        'status',
        'payment_frequency',
        'reference',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
