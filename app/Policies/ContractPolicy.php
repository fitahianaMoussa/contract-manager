<?php

namespace App\Policies;

use App\Models\Contract;
use App\Models\User;

class ContractPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Contract $contract): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR']) && $contract->product->company->broker->id === $user->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Contract $contract): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR']) && $contract->product->company->broker->id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Contract $contract): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_COLLABORATOR'])
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_BROKER_COLLABORATOR']) && $contract->product->company->broker->id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Contract $contract): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Contract $contract): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN', 'ROLE_BROKER']);
    }
}
