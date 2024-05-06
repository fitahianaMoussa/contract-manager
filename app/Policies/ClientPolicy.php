<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;

class ClientPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']) && ($client->broker->id === $user->id || $client->broker->broker_id === $user->id || $client->broker->broker_id === $user->broker_id || $client->broker->id === $user->broker_id));
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']) && ($client->broker->id === $user->id || $client->broker->broker_id === $user->id || $client->broker->broker_id === $user->broker_id || $client->broker->id === $user->broker_id));
    }

    /**
     * Determine whether the user can update the model.
     */
    public function validate(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']) && ($client->broker->id === $user->id || $client->broker->broker_id === $user->id || $client->broker->broker_id === $user->broker_id || $client->broker->id === $user->broker_id));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR', 'ROLE_BROKER_MANAGER']) && ($client->broker->id === $user->id || $client->broker->broker_id === $user->id || $client->broker->broker_id === $user->broker_id || $client->broker->id === $user->broker_id));
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Client $client): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }
}
