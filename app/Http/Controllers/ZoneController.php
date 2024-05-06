<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreZoneRequest;
use App\Http\Requests\UpdateZoneRequest;
use App\Http\Resources\ZoneCollection;
use App\Models\Zone;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PriceTable/Zone', [
            'zones' => new ZoneCollection(Zone::with(['broker'])->get()),
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
    public function store(StoreZoneRequest $request)
    {
        $zone = new Zone();
        $zone->name = $request->name;
        $zone->broker_id = Auth::user()->id;
        $zone->save();

        redirect(route('zones.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Zone $zone)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Zone $zone)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateZoneRequest $request, Zone $zone)
    {
        $validated = $request->validated();
        $zone->update($validated);
        redirect(route('zones.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone)
    {
        $zone->delete();
        redirect(route('zones.index'));
    }
}
