<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBrokerCollaboratorRequest;
use App\Http\Requests\UpdateBrokerCollaboratorRequest;
use App\Http\Resources\UserCollection;
use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BrokerCollaboratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BrokerCollaborator/Index', [
            'broker_collaborators' => new UserCollection(
                User::where('role', 'ROLE_BROKER_COLLABORATOR')->where('broker_id', Auth::user()->id)->orderByDesc('created_at')->paginate(20)
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrokerCollaboratorRequest $request)
    {
        $validated = $request->validated();

        $password = PasswordGenerator::generate();
        $newCollaborator = User::create([
            ...$validated,
            'password' => Hash::make($password),
            'role' => 'ROLE_'.strtoupper($request->role),
            'broker_id' => Auth::user()->id,
        ]);

        Mail::to($newCollaborator->email)->send(new UserCreated($newCollaborator, $password));

        return redirect()->route('broker_collaborators.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('companies');
        $user->load('clients');

        return Inertia::render('BrokerCollaborator/Detail', [
            'broker_collaborator' => $user,
        ]);
    }

    /**
     * Update an existing resource in storage.
     */
    public function update(UpdateBrokerCollaboratorRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update($validated);

        return redirect()->route('broker_collaborators.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('broker_collaborators.index');
    }
}
