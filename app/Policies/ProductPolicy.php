<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
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
    public function view(User $user, Product $product): bool
    {
        return $user->role === 'ROLE_ADMIN'
            || (in_array($user->role, ['ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR']) && ($product->company->broker->id === $user->id || $product->company->broker->broker_id === $user->id));
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
    public function update(User $user, Product $product): bool
    {
        return $user->role === 'ROLE_ADMIN'
        || (in_array($user->role, ['ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR']) && ($product->company->broker->id === $user->id || $product->company->broker->broker_id === $user->id));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->role === 'ROLE_ADMIN'
        || (in_array($user->role, ['ROLE_BROKER', 'ROLE_COLLABORATOR', 'ROLE_BROKER_COLLABORATOR']) && ($product->company->broker->id === $user->id) || $product->company->broker->broker_id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Product $product): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Product $product): bool
    {
        return in_array($user->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
    }
}
