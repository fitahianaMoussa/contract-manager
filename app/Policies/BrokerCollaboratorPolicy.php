<?php

namespace App\Policies;

use App\Models\User;

class BrokerCollaboratorPolicy extends BrokerManagerPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'ROLE_BROKER';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $collaborator): bool
    {
        return $user->role === 'ROLE_BROKER' && $user->id === $collaborator->broker_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'ROLE_BROKER';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $collaborator): bool
    {
        return $user->role === 'ROLE_BROKER' && $user->id === $collaborator->broker_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $collaborator): bool
    {
        return $user->role === 'ROLE_BROKER' && $user->id === $collaborator->broker_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $collaborator): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $collaborator): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }
}
