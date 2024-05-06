<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrokerRequest;
use App\Http\Requests\UpdateBrokerRequest;
use App\Http\Resources\BrokerCollection;
use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BrokerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Broker/Index', [
            'brokers' => new BrokerCollection(
                User::with('clients')->where('role', 'ROLE_BROKER')->orderByDesc('created_at')->paginate(20)
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrokerRequest $request)
    {
        $validated = $request->validated();

        $password = PasswordGenerator::generate();
        $newBroker = User::create([
            ...$validated,
            'password' => Hash::make($password),
            'role' => 'ROLE_'.strtoupper($request->role),
        ]);

        Mail::to($newBroker->email)->send(new UserCreated($newBroker, $password));

        redirect(route('brokers.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(User $broker)
    {
        $broker->load('companies');
        $broker->load('clients');

        return Inertia::render('Broker/Detail', [
            'broker' => $broker,
        ]);
    }

    /**
     * Update an existing resource in storage.
     */
    public function update(UpdateBrokerRequest $request, User $broker)
    {
        $validated = $request->validated();

        $broker->update($validated);

        redirect(route('brokers.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $broker)
    {
        $broker->delete();

        return back();
    }
}
