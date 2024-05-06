<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePriceTableRequest;
use App\Http\Requests\UpdatePriceTableRequest;
use App\Http\Resources\AgeCollection;
use App\Http\Resources\OptionCollection;
use App\Http\Resources\PriceTableCollection;
use App\Http\Resources\ZoneCollection;
use App\Models\Age;
use App\Models\Option;
use App\Models\PriceTable;
use App\Models\Zone;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PriceTableController extends Controller
{
    public function index()
    {
        return Inertia::render('PriceTable/Price', [
            'price_tables' => new PriceTableCollection(
                // PriceTable::with(['age', 'option', 'zone'])->where('broker_id', Auth::user()->id)->get()->groupBy('zone.name')
                PriceTable::with(['age', 'option', 'zone', 'broker'])->get()
            ),
            'zones' => new ZoneCollection(Zone::all()),
            'ages' => new AgeCollection(Age::all()),
            'options' => new OptionCollection(Option::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePriceTableRequest $request)
    {
        $validated = $request->validated();
        $validated['broker_id'] = Auth::user()->id;
        PriceTable::create($validated);

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePriceTableRequest $request, PriceTable $price)
    {
        $validated = $request->validated();
        $price->update($validated);
        redirect(route('prices.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PriceTable $price_table)
    {
        $price_table->delete();
        redirect(route('prices.index'));
    }
}
