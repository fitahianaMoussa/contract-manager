<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Client;
use App\Models\Company;
use App\Models\Contract;
use App\Models\Product;
use App\Models\Regulation;
use App\Models\User;
use App\Policies\AdminPolicy;
use App\Policies\BrokerCollaboratorPolicy;
use App\Policies\BrokerManagerPolicy;
use App\Policies\BrokerPolicy;
use App\Policies\ClientPolicy;
use App\Policies\CollaboratorPolicy;
use App\Policies\CompanyPolicy;
use App\Policies\ContractPolicy;
use App\Policies\ProductPolicy;
use App\Policies\RegulationPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => AdminPolicy::class,
        User::class => BrokerPolicy::class,
        User::class => BrokerCollaboratorPolicy::class,
        User::class => BrokerManagerPolicy::class,
        User::class => CollaboratorPolicy::class,
        Client::class => ClientPolicy::class,
        Company::class => CompanyPolicy::class,
        Product::class => ProductPolicy::class,
        Contract::class => ContractPolicy::class,
        Regulation::class => RegulationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
