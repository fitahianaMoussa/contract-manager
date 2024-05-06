<?php

namespace App\Policies;

use App\Models\User;

class BrokerPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $broker): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN'])
            || ($user->role === 'ROLE_BROKER' && $user->id === $broker->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $broker): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN'])
            || ($user->role === 'ROLE_BROKER' && $user->id === $broker->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $broker): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN'])
            || ($user->role === 'ROLE_BROKER' && $user->id === $broker->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $broker): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $broker): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }
}
