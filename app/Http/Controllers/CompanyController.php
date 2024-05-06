<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Resources\CompanyCollection;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::orderByDesc('created_at')->paginate(20);

        return Inertia::render('Company/Index', [
            'companies' => new CompanyCollection($companies),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        // $company->load('products', 'products.broker');
        // $company->load('broker');
        $company = Company::with(['products.broker', 'products', 'broker'])->find($company->id);

        return Inertia::render('Company/Detail', [
            'company' => $company,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        $validated = $request->validated();

        Company::create([
            ...$validated,
            'broker_id' => Auth::user()->id,
        ]);

        return redirect()->route('companies.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCompanyRequest $request, Company $company)
    {
        $validated = $request->validated();

        $company->update($validated);

        return redirect()->route('companies.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('companies.index');
    }
}
