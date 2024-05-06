<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgeRequest;
use App\Http\Requests\UpdateAgeRequest;
use App\Http\Resources\AgeCollection;
use App\Models\Age;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PriceTable/Age', [
            'ages' => new AgeCollection(Age::with(['broker'])->get()),
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
    public function store(StoreAgeRequest $request)
    {
        $age = new Age();
        $age->value = $request->value;
        $age->broker_id = Auth::user()->id;
        $age->save();

        redirect(route('ages.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Age $age)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Age $age)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAgeRequest $request, Age $age)
    {
        $validated = $request->validated();
        $age->update($validated);
        redirect(route('ages.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Age $age)
    {
        $age->delete();
        redirect(route('ages.index'));
    }
}
