<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AgeController;
use App\Http\Controllers\BrokerCollaboratorController;
use App\Http\Controllers\BrokerController;
use App\Http\Controllers\BrokerManagerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CollaboratorController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\PriceTableController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProspectController;
use App\Http\Controllers\RegulationController;
use App\Http\Controllers\ZoneController;
use App\Models\Age;
use App\Models\Client;
use App\Models\Company;
use App\Models\Contract;
use App\Models\Location;
use App\Models\Option;
use App\Models\PriceTable;
use App\Models\Product;
use App\Models\Prospect;
use App\Models\Regulation;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('brokers')->group(function () {
    Route::get('/', [BrokerController::class, 'index'])->can('viewAny', User::class)->name('brokers.index');
    Route::post('/', [BrokerController::class, 'store'])->can('create', User::class)->name('brokers.store');
    Route::get('/{broker}/show', [BrokerController::class, 'show'])->can('view', 'broker')->name('brokers.show');
    Route::put('/{broker}/update', [BrokerController::class, 'update'])->can('update', 'broker')->name('brokers.update');
    Route::delete('/{broker}/delete', [BrokerController::class, 'destroy'])->can('delete', 'broker')->name('brokers.destroy');
});

Route::middleware('auth')->prefix('collaborators')->group(function () {
    Route::get('/', [CollaboratorController::class, 'index'])->can('viewAny', User::class)->name('collaborators.index');
    Route::post('/', [CollaboratorController::class, 'store'])->can('create', User::class)->name('collaborators.store');
    Route::get('/{user}/show', [CollaboratorController::class, 'show'])->can('view', 'user')->name('collaborators.show');
    Route::put('/{user}/update', [CollaboratorController::class, 'update'])->can('update', 'user')->name('collaborators.update');
    Route::delete('/{user}/delete', [CollaboratorController::class, 'destroy'])->can('delete', 'user')->name('collaborators.destroy');
});

Route::middleware('auth')->prefix('broker/collaborators')->group(function () {
    Route::get('/', [BrokerCollaboratorController::class, 'index'])->can('viewAny', User::class)->name('broker_collaborators.index');
    Route::post('/', [BrokerCollaboratorController::class, 'store'])->can('create', User::class)->name('broker_collaborators.store');
    Route::get('/{user}/show', [BrokerCollaboratorController::class, 'show'])->can('view', 'user')->name('broker_collaborators.show');
    Route::put('/{user}/update', [BrokerCollaboratorController::class, 'update'])->can('update', 'user')->name('broker_collaborators.update');
    Route::delete('/{user}/delete', [BrokerCollaboratorController::class, 'destroy'])->can('delete', 'user')->name('broker_collaborators.destroy');
});

Route::middleware('auth')->prefix('broker/managers')->group(function () {
    Route::get('/', [BrokerManagerController::class, 'index'])->can('viewAny', User::class)->name('broker_managers.index');
    Route::post('/', [BrokerManagerController::class, 'store'])->can('create', User::class)->name('broker_managers.store');
    Route::get('/{user}/show', [BrokerManagerController::class, 'show'])->can('view', 'user')->name('broker_managers.show');
    Route::put('/{user}/update', [BrokerManagerController::class, 'update'])->can('update', 'user')->name('broker_managers.update');
    Route::delete('/{user}/delete', [BrokerManagerController::class, 'destroy'])->can('delete', 'user')->name('broker_managers.destroy');
});

Route::middleware('auth')->prefix('clients')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->can('viewAny', Client::class)->name('clients.index');
    Route::post('/', [ClientController::class, 'store'])->can('create', Client::class)->name('clients.store');
    Route::get('/{client}/show', [ClientController::class, 'show'])->can('view', 'client')->name('clients.show');
    Route::put('/{client}/validate', [ClientController::class, '_validate'])->name('clients.validate');
    Route::put('/{client}/update', [ClientController::class, 'update'])->can('update', 'client')->name('clients.update');
    Route::delete('/{client}/delete', [ClientController::class, 'destroy'])->can('delete', 'client')->name('clients.destroy');
});

Route::middleware('auth')->prefix('companies')->group(function () {
    Route::get('/', [CompanyController::class, 'index'])->can('viewAny', Company::class)->name('companies.index');
    Route::post('/', [CompanyController::class, 'store'])->can('create', Company::class)->name('companies.store');
    Route::get('/{company}/show', [CompanyController::class, 'show'])->can('view', 'company')->name('companies.show');
    Route::put('/{company}/update', [CompanyController::class, 'update'])->can('update', 'company')->name('companies.update');
    Route::delete('/{company}/delete', [CompanyController::class, 'destroy'])->can('delete', 'company')->name('companies.destroy');
});

Route::middleware('auth')->prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->can('viewAny', Product::class)->name('products.index');
    Route::post('/', [ProductController::class, 'store'])->can('create', Product::class)->name('products.store');
    Route::put('/{product}/update', [ProductController::class, 'update'])->can('update', 'product')->name('products.update');
    Route::delete('/{product}/delete', [ProductController::class, 'destroy'])->can('delete', 'product')->name('products.destroy');
});

Route::middleware('auth')->prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index'])->can('viewAny', Contract::class)->name('contracts.index');
    Route::post('/update', [ContractController::class, 'update'])->can('create', Contract::class)->name('contracts.update');
    Route::post('/', [ContractController::class, 'store'])->can('create', Contract::class)->name('contracts.store');
    Route::delete('/{contract}/delete', [ContractController::class, 'destroy'])->can('delete', 'contract')->name('contracts.destroy');
});

Route::middleware('auth')->prefix('prices')->group(function () {
    Route::get('/', [PriceTableController::class, 'index'])->can('viewAny', PriceTable::class)->name('prices.index');
    Route::post('/', [PriceTableController::class, 'store'])->can('create', PriceTable::class)->name('prices.store');
    Route::put('/{price}/update', [PriceTableController::class, 'update'])->can('update', 'price')->name('prices.update');
    Route::delete('/{price}/delete', [PriceTableController::class, 'destroy'])->can('delete', 'price')->name('prices.destroy');
});

Route::middleware('auth')->prefix('zones')->group(function () {
    Route::get('/', [ZoneController::class, 'index'])->can('viewAny', Zone::class)->name('zones.index');
    Route::post('/', [ZoneController::class, 'store'])->can('create', Zone::class)->name('zones.store');
    Route::put('/{zone}/update', [ZoneController::class, 'update'])->can('update', 'zone')->name('zones.update');
    Route::delete('/{zone}/delete', [ZoneController::class, 'destroy'])->can('delete', 'zone')->name('zones.destroy');
});

Route::middleware('auth')->prefix('locations')->group(function () {
    Route::get('/', [LocationController::class, 'index'])->can('viewAny', Location::class)->name('locations.index');
    Route::post('/', [LocationController::class, 'store'])->can('create', Location::class)->name('locations.store');
    Route::put('/{location}/update', [LocationController::class, 'update'])->can('update', 'location')->name('locations.update');
    Route::delete('/{location}/delete', [LocationController::class, 'destroy'])->can('delete', 'location')->name('locations.destroy');
});

Route::middleware('auth')->prefix('options')->group(function () {
    Route::get('/', [OptionController::class, 'index'])->can('viewAny', Option::class)->name('options.index');
    Route::post('/', [OptionController::class, 'store'])->can('create', Option::class)->name('options.store');
    Route::put('/{option}/update', [OptionController::class, 'update'])->can('update', 'option')->name('options.update');
    Route::delete('/{option}/delete', [OptionController::class, 'destroy'])->can('delete', 'option')->name('options.destroy');
});

Route::middleware('auth')->prefix('ages')->group(function () {
    Route::get('/', [AgeController::class, 'index'])->can('viewAny', Age::class)->name('ages.index');
    Route::post('/', [AgeController::class, 'store'])->can('create', Age::class)->name('ages.store');
    Route::put('/{age}/update', [AgeController::class, 'update'])->can('update', 'age')->name('ages.update');
    Route::delete('/{age}/delete', [AgeController::class, 'destroy'])->can('delete', 'age')->name('ages.destroy');
});

Route::middleware('auth')->get('/admin', [AdminController::class, 'index'])->can('viewAny', User::class)->name('admin.index');

Route::middleware('auth')->prefix('regulations')->group(function () {
    Route::get('/', [RegulationController::class, 'index'])->can('viewAny', Regulation::class)->name('regulations.index');
    Route::post('/', [RegulationController::class, 'store'])->can('create', Regulation::class)->name('regulations.store');
    Route::get('/{regulation}/show', [RegulationController::class, 'show'])->can('view', 'regulation')->name('regulations.show');
    Route::put('/{regulation}/update', [RegulationController::class, 'update'])->can('update', 'regulation')->name('regulations.update');
    Route::delete('/{regulation}/delete', [RegulationController::class, 'destroy'])->can('delete', 'regulation')->name('regulations.destroy');
});

Route::middleware('auth')->prefix('prospects')->group(function () {
    Route::get('/', [ProspectController::class, 'index'])->can('viewAny', Prospect::class)->name('prospects.index');
    Route::post('/', [ProspectController::class, 'store'])->can('create', Prospect::class)->name('prospects.store');
    Route::get('/{prospect}/show', [ProspectController::class, 'show'])->can('view', 'prospect')->name('prospects.show');
    Route::put('/{prospect}/update', [ProspectController::class, 'update'])->can('update', 'prospect')->name('prospects.update');
    Route::delete('/{prospect}/delete', [ProspectController::class, 'destroy'])->can('delete', 'prospect')->name('prospects.destroy');
    Route::put('/{prospect}/convertToClient', [ProspectController::class, 'convertToClient'])->can('update', 'prospect')->name('prospects.convertToClient');
});

Route::middleware('auth')->get('/import-client', [ExcelImportController::class, 'index'])->name('import.excel');
Route::middleware('auth')->post('/import-client', [ExcelImportController::class, 'import'])->name('import.client');

Route::middleware('auth')->get('/insurance', function () {
    return Inertia::render('Insurance/Index');
})->name('insurance.index');
Route::middleware('auth')->get('/formation', function () {
    return Inertia::render('Formation/Index');
})->name('formation.index');

require_once __DIR__.'/auth.php';
