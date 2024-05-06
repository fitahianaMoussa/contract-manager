<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCollaboratorRequest;
use App\Http\Requests\UpdateCollaboratorRequest;
use App\Http\Resources\UserCollection;
use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class CollaboratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Collaborator/Index', [
            'collaborators' => new UserCollection(
                User::with('clients')->where('role', 'ROLE_BROKER_COLLABORATOR')->orderByDesc('created_at')->paginate(20)
            ),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollaboratorRequest $request)
    {
        $validated = $request->validated();

        $password = PasswordGenerator::generate();
        $newUser = User::create([
            ...$validated,
            'password' => Hash::make($request->password),
            'role' => 'ROLE_'.strtoupper($request->role),
        ]);

        Mail::to($newUser->email)->send(new UserCreated($newUser, $password));

        return redirect()->route('collaborators.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('companies');
        $user->load('clients');

        return Inertia::render('Collaborator/Detail', [
            'collaborator' => $user,
        ]);
    }

    /**
     * Update an existing resource in storage.
     */
    public function update(UpdateCollaboratorRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update($validated);

        return redirect()->route('collaborators.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('collaborators.index');
    }
}
