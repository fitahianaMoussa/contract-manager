<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use App\Http\Resources\AdminCollection;
use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Index', [
            'admins' => new AdminCollection(User::whereIn('role', ['ROLE_ADMIN', 'ROLE_SUPERUSER'])->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        $validated = $request->validated();

        $password = PasswordGenerator::generate();
        $newAdmin = User::create([
            ...$validated,
            'password' => Hash::make($password),
            'role' => 'ROLE_'.strtoupper($request->role),
        ]);

        // Make sure UserCreated mail is imported or referenced correctly
        Mail::to($newAdmin->email)->send(new \App\Mail\UserCreated($newAdmin, $password));

        // Redirect to the correct route
        return redirect()->route('admin.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.index');
    }
}
