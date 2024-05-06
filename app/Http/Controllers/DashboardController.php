<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $authenticatedUser = Auth::user();
        $isAdmin = in_array($authenticatedUser->role, ['ROLE_SUPERUSER', 'ROLE_ADMIN']);
        $clientsIds = ($isAdmin ? Client::get() : Client::where('broker_id', $authenticatedUser->id)->get())->map(fn (Client $c) => $c->id);

        $months = collect(range(1, 12))->map(function ($month) {
            return ['month' => date('F', mktime(0, 0, 0, $month, 1)), 'amount' => 0];
        });

        $incomeData = (
        $isAdmin
            ? Contract::select(DB::raw("MONTHNAME(created_at) as month"), DB::raw('SUM(amount) as amount'))
            ->whereYear('created_at', date('Y'))
            ->groupBy(DB::raw("MONTHNAME(created_at)"))
            ->get()
            : Contract::select(DB::raw("MONTHNAME(created_at) as month"), DB::raw('SUM(amount) as amount'))
            ->whereYear('created_at', date('Y'))
            ->groupBy(DB::raw("MONTHNAME(created_at)"))
            ->get()->filter(fn (Contract $c) => $clientsIds->contains($c->client?->id))
        )->keyBy('month');

        return Inertia::render('Dashboard/Index', [
            'initialValues' => [
                'clients_count' => (
                $isAdmin
                    ? Client::count()
                    : Client::where('broker_id', $authenticatedUser->id)->count()
                ),
                'valid_clients_count' => (
                $isAdmin
                    ? Client::where('is_valid', true)->count()
                    : Client::where('broker_id', $authenticatedUser->id)->where('is_valid', true)->count()
                ),
                'contracts_count' => (
                $isAdmin
                    ? Contract::count()
                    : Contract::whereIn('client_id', $clientsIds)->count()
                ),
                'income' => (
                $isAdmin
                    ? Contract::sum('amount')
                    : Contract::whereIn('client_id', $clientsIds)->sum('amount')
                ),
                'pie' => [
                    [
                        'name' => 'Clients non validés',
                        'amount' => (
                        $isAdmin
                            ? Contract::where('is_valid', false)->sum('amount')
                            : Contract::whereIn('client_id', $clientsIds)->where('is_valid', false)->sum('amount')
                        ),
                    ],
                    [
                        'name' => 'Clients validés',
                        'amount' => (
                        $isAdmin
                            ? Contract::where('is_valid', true)->sum('amount')
                            : Contract::whereIn('client_id', $clientsIds)->where('is_valid', true)->sum('amount')
                        ),
                    ],
                ],
                'line' => $months->map(function ($month) use ($incomeData) {
                    return $incomeData->has($month['month']) ? $incomeData[$month['month']] : $month;
                }),
                'last_clients' => $isAdmin
                    ? Client::orderByDesc('created_at')->limit(10)->get()
                    : Client::where('broker_id', $authenticatedUser->id)->orderByDesc('created_at')->limit(10)->get(),
                'last_contracts' => $isAdmin
                    ? Contract::with('client')->orderByDesc('created_at')->limit(10)->get()
                    : Contract::with('client')->whereIn('client_id', $clientsIds)->orderByDesc('created_at')->limit(10)->get(),
            ],
        ]);
    }
}
