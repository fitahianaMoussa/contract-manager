<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Prepare exception for rendering.
     *
     * @return \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
            return Inertia::render('Error/Index', [
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
                'status' => $response->getStatusCode(),
            ]);
        } elseif ($response->getStatusCode() === 419) {
            return back()->with([
                'message' => 'The page expired, please try again.',
            ]);
        }

        return $response;
    }
}
