<?php

namespace App\Http\Middleware;

use App\Models\Age;
use App\Models\Client;
use App\Models\Company;
use App\Models\Contract;
use App\Models\Location;
use App\Models\PriceTable;
use App\Models\Product;
use App\Models\Prospect;
use App\Models\Regulation;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => [
                    ...$request->user()?->toArray() ?? [],
                    'can' => [
                        'viewAnyBroker' => Auth::user()?->can('viewAny', User::class),
                        'createBroker' => Auth::user()?->can('create', User::class),
                        'viewAnyBrokerCollaborator' => Auth::user()?->can('viewAny', User::class),
                        'createBrokerCollaborator' => Auth::user()?->can('create', User::class),
                        'viewAnyBrokerManager' => Auth::user()?->can('viewAny', User::class),
                        'createBrokerManager' => Auth::user()?->can('create', User::class),
                        'viewAnyCollaborator' => Auth::user()?->can('viewAny', User::class),
                        'createCollaborator' => Auth::user()?->can('create', User::class),
                        'viewAnyClient' => Auth::user()?->can('viewAny', Client::class),
                        'createClient' => Auth::user()?->can('create', Client::class),
                        'viewAnyCompany' => Auth::user()?->can('viewAny', Company::class),
                        'createCompany' => Auth::user()?->can('create', Company::class),
                        'viewAnyProduct' => Auth::user()?->can('viewAny', Product::class),
                        'createProduct' => Auth::user()?->can('create', Product::class),
                        'viewAnyContract' => Auth::user()?->can('viewAny', Contract::class),
                        'createContract' => Auth::user()?->can('create', Contract::class),
                        'viewAnyPrice' => Auth::user()?->can('viewAny', PriceTable::class),
                        'createPrice' => Auth::user()?->can('create', PriceTable::class),
                        'viewAnyAge' => Auth::user()?->can('viewAny', Age::class),
                        'createAge' => Auth::user()?->can('create', Age::class),
                        'viewAnyZone' => Auth::user()?->can('viewAny', Zone::class),
                        'createZone' => Auth::user()?->can('create', Zone::class),
                        'viewAnyLocation' => Auth::user()?->can('viewAny', Location::class),
                        'createLocation' => Auth::user()?->can('create', Location::class),
                        'viewAnyRegulation' => Auth::user()?->can('viewAny', Regulation::class),
                        'createRegulation' => Auth::user()?->can('create', Regulation::class),
                        'viewAnyProspect' => Auth::user()?->can('viewAny', Prospect::class),
                        'createProspect' => Auth::user()?->can('create', Prospect::class),
                    ],
                ],
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
        ];
    }
}
