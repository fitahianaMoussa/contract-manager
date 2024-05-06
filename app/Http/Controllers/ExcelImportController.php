<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\ClientImportClass;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Excel;

class ExcelImportController extends Controller
{
    public function import(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'attachments' => 'required',
        ]);
 
        // Get the uploaded file
        $file = $request->file('attachments')[0];
 
        // Process the Excel file
        Excel::import(new ClientImportClass(Auth::user()->id), $file);
 
        return redirect()->back()->with('success', 'Excel file imported successfully!');
    }


    public function index()
    {
        $role = Auth::user()->role;
        $isAdmin = Auth::user()->role === 'ROLE_ADMIN';
        return Inertia::render('Client/Import', [
        ]);
    }
}
