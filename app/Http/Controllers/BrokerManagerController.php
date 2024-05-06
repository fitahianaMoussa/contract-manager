<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrokerManagerRequest;
use App\Http\Requests\UpdateBrokerManagerRequest;
use App\Http\Resources\UserCollection;
use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BrokerManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BrokerManager/Index', [
            'broker_managers' => new UserCollection(
                User::where('role', 'ROLE_BROKER_MANAGER')->where('broker_id', Auth::user()->id)->orderByDesc('created_at')->paginate(20)
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrokerManagerRequest $request)
    {
        $validated = $request->validated();

        $password = PasswordGenerator::generate();
        $newManager = User::create([
            ...$validated,
            'password' => Hash::make($password),
            'role' => 'ROLE_'.strtoupper($request->role),
            'broker_id' => Auth::user()->id,
        ]);

        Mail::to($newManager->email)->send(new UserCreated($newManager, $password));

        return redirect()->route('broker_managers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('clients');

        return Inertia::render('BrokerManager/Detail', [
            'broker_manager' => $user,
        ]);
    }

    /**
     * Update an existing resource in storage.
     */
    public function update(UpdateBrokerManagerRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update($validated);

        return redirect()->route('broker_managers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('broker_managers.index');
    }
}
