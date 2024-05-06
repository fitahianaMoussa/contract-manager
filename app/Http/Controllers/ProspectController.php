<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConvertToClientRequest;
use App\Http\Requests\StoreProspectRequest;
use App\Http\Requests\UpdateProspectRequest;
use App\Models\Client;
use App\Models\Prospect;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProspectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prospects = Prospect::with(['broker'])->where('broker_id', Auth::user()->id)->get();

        return Inertia::render('Prospect/Index', [
            'prospects' => $prospects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProspectRequest $request)
    {
        $validated = $request->validated();

        Prospect::create([
            ...$validated,
            'broker_id' => Auth::user()->id,
        ]);

        redirect(route('prospects.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Prospect $prospect)
    {
        $prospect->load('broker');

        return Inertia::render('Prospect/Detail', [
            'prospect' => $prospect,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prospect $prospect)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProspectRequest $request, Prospect $prospect)
    {
        $validated = $request->validated();
        $prospect->update($validated);

        redirect(route('prospects.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prospect $prospect)
    {
        $prospect->delete();
        redirect(route('prospects.index'));
    }

    public function convertToClient(ConvertToClientRequest $request, Prospect $prospect)
    {
        $client = new Client(array_merge(
            $prospect->only(['first_name', 'last_name', 'date_of_birth', 'description', 'email', 'phone', 'city', 'country', 'broker_id', 'social_security_number']),
            [
                'zip_code' => $prospect->postal_code,
                'street' => $prospect->address,
            ],
            $request->validated()
        ));
        if ($client->save()) {
            $prospect->delete();
        }

        return redirect()->route('prospects.index')->with('success', 'Prospect convertisé en client avec succès.');
    }
}
