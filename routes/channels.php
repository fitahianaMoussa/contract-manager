<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.Client.Created', function (User $user) {
    return Auth::check();
});

Broadcast::channel('App.Models.Contract.Created', function (User $user) {
    return $user->role === 'ROLE_ADMIN';
});
