<?php

namespace App\Policies;

use App\Models\Prospect;
use App\Models\User;

class ProspectPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR', 'ROLE_BROKER']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Prospect $prospect): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || ($user->role === 'ROLE_BROKER' && $prospect->broker_id === $user->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR', 'ROLE_BROKER']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Prospect $prospect): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || ($user->role === 'ROLE_BROKER' && $prospect->broker_id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Prospect $prospect): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || ($user->role === 'ROLE_BROKER' && $prospect->broker_id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Prospect $prospect): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Prospect $prospect): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }
}
