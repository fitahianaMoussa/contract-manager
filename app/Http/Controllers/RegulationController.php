<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegulationRequest;
use App\Http\Requests\UpdateRegulationRequest;
use App\Http\Resources\RegulationCollection;
use App\Models\Regulation;
use Inertia\Inertia;

class RegulationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Regulation/Index', [
            'regulations' => new RegulationCollection(Regulation::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegulationRequest $request)
    {
        $validated = $request->validated();

        Regulation::create($validated);

        redirect(route('regulations.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Regulation $regulation)
    {
        return Inertia::render('Regulation/Detail', [
            'regulation' => $regulation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegulationRequest $request, Regulation $regulation)
    {
        $validated = $request->validated();
        $regulation->update($validated);
        redirect(route('regulations.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Regulation $regulation)
    {
        $regulation->delete();
        redirect(route('regulations.index'));
    }
}
