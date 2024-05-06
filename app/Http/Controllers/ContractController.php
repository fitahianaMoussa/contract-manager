<?php

namespace App\Http\Controllers;

use App\Events\ContractCreated;
use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use App\Models\Age;
use App\Models\Client;
use App\Models\ClientFile;
use App\Models\Contract;
use App\Models\Location;
use App\Models\PriceTable;
use Illuminate\Support\Facades\Auth;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreContractRequest $request)
    {
        $validated = $request->validated();

        $client = (Client::where('id', $request->client_id)->get())->first();
        $locations = Location::with('zone')->where('broker_id', Auth::user()->id)->get();
        $zone = $locations->filter(fn (Location $l) => $l->name === $client->city)->first()?->zone;
        if (! $request->amount && $zone === null) {
            Contract::create([
                ...$validated,
                'product_id' => intval($request->product_id),
                'amount' => floatval('0.00'),
                'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
                'status' => 'active',
            ]);

            return back()->with('message', [
                'type' => 'error',
                'context' => 'contract',
                'content' => 'La ville du client est introuvable',
            ]);
        }

        $dob = new \DateTime($client->date_of_birth);
        $currentDate = new \DateTime('now', new \DateTimeZone('UTC'));
        $age = $currentDate->diff($dob)->y;
        if (! $request->amount && ! Age::where('value', $age)->exists()) {
            Contract::create([
                ...$validated,
                'product_id' => intval($request->product_id),
                'amount' => floatval('0.00'),
                'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
                'status' => 'active',
            ]);

            return back()->with('message', [
                'type' => 'error',
                'context' => 'contract',
                'content' => "L'age du client est introuvable",
            ]);
        }

        $price = (PriceTable::where('broker_id', '=', Auth::user()->id, 'and', 'age', '=', $age, 'and', 'zone_id', '=', $zone?->id, 'and', 'option_id', '=', $request->option_id)->get())->first()?->value;

        Contract::create([
            ...$validated,
            'product_id' => intval($request->product_id),
            'amount' => floatval($request->amount ?? $price / 12),
            'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
            'status' => 'active',
        ]);

        if ($request->file('attachments')) {
            $uploadedFiles = $request->file('attachments');

            foreach ($uploadedFiles as $file) {
                $path = $file->store('attachments/'.$client->id);

                ClientFile::create([
                    'broker_id' => Auth::user()->id,
                    'client_id' => $client->id,
                    'path' => $path,
                ]);
            }
        }

        ContractCreated::dispatch(Contract::with('client')->get());

        redirect(route('clients.show', $request->client_id));
    }

    /**
     * Display the specified resource.
     */
    public function show(Contract $contract)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContractRequest $request)
    {
        $contract = Contract::where('id', $request->id);
        $validated = $request->validated();

        $client = (Client::where('id', $request->client_id)->get())->first();
        $locations = Location::with('zone')->where('broker_id', Auth::user()->id)->get();
        $zone = $locations->filter(fn (Location $l) => $l->name === $client->city)->first()?->zone;

        if (! $request->amount && $zone === null) {
            $contract->update([
                'reference' => $request->reference,
                'client_id' => $request->client_id,
                'product_id' => $request->product_id,
                'payment_frequency' => $request->payment_frequency,
                'description' => $request->description,
                'product_id' => intval($request->product_id),
                'amount' => floatval('0.00'),
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
            ]);

            return back()->with('message', [
                'type' => 'error',
                'context' => 'contract',
                'content' => 'La ville du client est introuvable',
            ]);
        }
        $dob = new \DateTime($client->date_of_birth);
        $currentDate = new \DateTime('now', new \DateTimeZone('UTC'));
        $age = $currentDate->diff($dob)->y;

        if (! $request->amount && ! Age::where('value', $age)->exists()) {
            $contract->update([
                'reference' => $request->reference,
                'client_id' => $request->client_id,
                'product_id' => $request->product_id,
                'payment_frequency' => $request->payment_frequency,
                'description' => $request->description,
                'product_id' => intval($request->product_id),
                'amount' => floatval('0.00'),
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
                'status' => 'active',
            ]);

            return back()->with('message', [
                'type' => 'error',
                'context' => 'contract',
                'content' => "L'age du client est introuvable",
            ]);
        }

        $price = (PriceTable::where('broker_id', '=', Auth::user()->id, 'and', 'age', '=', $age, 'and', 'zone_id', '=', $zone?->id, 'and', 'option_id', '=', $request->option_id)->get())->first()->value;
        $contract->update([
            'reference' => $request->reference,
            'client_id' => $request->client_id,
            'product_id' => $request->product_id,
            'payment_frequency' => $request->payment_frequency,
            'description' => $request->description,
            'product_id' => intval($request->product_id),
            'amount' => floatval($request->amount ?? $price / 12),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'administration_fees' => $request->administration_fees ? floatval($request->administration_fees) : null,
        ]);
        if ($request->file('attachments')) {
            $uploadedFiles = $request->file('attachments');

            foreach ($uploadedFiles as $file) {
                $path = $file->store('attachments/'.$client->id);

                ClientFile::create([
                    'broker_id' => Auth::user()->id,
                    'client_id' => $client->id,
                    'path' => $path,
                ]);
            }
        }

        redirect(route('clients.show', $request->client_id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contract $contract)
    {
        $contract->delete();

        return back();
    }
}
