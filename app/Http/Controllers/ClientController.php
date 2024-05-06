<?php

namespace App\Http\Controllers;

use App\Events\ClientCreated;
use App\Events\ClientValidated;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\ValidateClientRequest;
use App\Http\Resources\ClientCollection;
use App\Http\Resources\LocationCollection;
use App\Http\Resources\OptionCollection;
use App\Http\Resources\ProductCollection;
use App\Models\Client;
use App\Models\Location;
use App\Models\Option;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $role = Auth::user()->role;
        $query = Client::with(['broker', 'contracts'])->orderByDesc('created_at');

        if ($role === 'ROLE_BROKER') {
            $query->where('broker_id', $userId);
        }

        if (in_array($role, ['ROLE_BROKER_MANAGER', 'ROLE_BROKER_COLLABORATOR'])) {
            $query->where('broker_id', Auth::user()->broker_id)->orWhere('broker_id', $userId);
        }

        return Inertia::render('Client/Index', [
            'clients' => new ClientCollection($query->paginate(20)),
            'locations' => new LocationCollection(Location::with('zone')->get()),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        $client->load('contracts.product.company');
        $client->load('broker');

        return Inertia::render('Client/Detail', [
            'client' => $client,
            'options' => new OptionCollection(Option::get()),
            'products' => new ProductCollection(Product::with('company')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $validated = $request->validated();
        dd($validated);
        Client::create([
            ...$validated,
            'broker_id' => Auth::user()->id,
        ]);

        $authenticatedUser = Auth::user();
        $isAdmin = $authenticatedUser->role === 'ROLE_ADMIN';
        $clients = $isAdmin ? Client::get() : Client::where('broker_id', $authenticatedUser->id)->get();
        $last_clients = $isAdmin ? Client::orderByDesc('created_at')->limit(10)->get() : Client::where('broker_id', $authenticatedUser->id)->orderByDesc('created_at')->limit(10)->get();
        $last_clients = collect($last_clients)->toArray();
        broadcast(new ClientCreated($clients, $last_clients))->toOthers();

        redirect(route('clients.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreClientRequest $request, Client $client)
    {
        $validated = $request->validated();
        $client->update($validated);

        redirect(route('clients.index'));
    }

    /**
     * Edit the specified resource in storage.
     */
    public function _validate(ValidateClientRequest $request, Client $client)
    {
        $validated = $request->validated();

        $client->update([
            ...$validated,
            'is_valid' => true,
        ]);

        ClientValidated::dispatch(Client::get());

        return back()->with('message', ['type' => 'success', 'content' => 'Le client est validé']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        redirect(route('clients.index'));
    }
}
