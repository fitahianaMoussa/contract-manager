<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->text('bank_details')->nullable();
            $table->enum('insured_person', ['client', 'spouse', 'child', 'client_and_spouse', 'client_and_child', 'client_and_spouse_and_child'])->nullable()->default(null);
            $table->enum('regime', ['independent', 'farmer', 'retired_employee', 'retired_self_employed', 'student', 'unemployed', 'civil_servant', 'agricultural_worker'])->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn('bank_details');
            $table->dropColumn('insured_person');
            $table->dropColumn('regime');
        });
    }
};
