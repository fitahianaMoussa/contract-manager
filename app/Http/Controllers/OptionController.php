<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOptionRequest;
use App\Http\Requests\UpdateOptionRequest;
use App\Http\Resources\OptionCollection;
use App\Models\Option;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PriceTable/Option', [
            'options' => new OptionCollection(Option::with(['broker'])->get()),
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
    public function store(StoreOptionRequest $request)
    {
        $validated = $request->validated();
        Option::create([
            ...$validated,
            'broker_id' => Auth::user()->id,
        ]);

        redirect(route('options.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Option $option)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Option $option)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOptionRequest $request, Option $option)
    {
        $validated = $request->validated();
        $option->update($validated);
        redirect(route('options.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Option $option)
    {
        $option->delete();
        redirect(route('options.index'));
    }
}
