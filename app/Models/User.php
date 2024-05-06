<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'is_active',
        'phone',
        'firm_name',
        'firm_address',
        'broker_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        // 'role',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function clients()
    {
        return $this->hasMany(Client::class, 'broker_id');
    }

    public function companies()
    {
        return $this->hasMany(Company::class, 'broker_id');
    }

    public function broker()
    {
        return $this->belongsTo(User::class, 'broker_id');
    }

    /**
     * The channels the user receives notification broadcasts on.
     *
     * @return string
     */
    /*public function receivesBroadcastNotificationsOn()
    {
        return 'App.User.' . $this->id;
    }*/
}
