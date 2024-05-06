<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLocationRequest;
use App\Http\Requests\UpdateLocationRequest;
use App\Http\Resources\LocationCollection;
use App\Http\Resources\ZoneCollection;
use App\Models\Location;
use App\Models\Zone;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PriceTable/Location', [
            'locations' => new LocationCollection(Location::with(['zone', 'broker'])->get()),
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
    public function store(StoreLocationRequest $request)
    {
        $validated = $request->validated();

        Location::create([
            ...$validated,
            'broker_id' => Auth::user()->id,
        ]);

        redirect(route('locations.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $validated = $request->validated();
        $location->update($validated);
        redirect(route('locations.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $location->delete();
        redirect(route('locations.index'));
    }
}
