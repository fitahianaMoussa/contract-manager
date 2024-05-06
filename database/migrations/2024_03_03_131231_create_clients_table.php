<?php

use App\Models\User;
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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('date_of_birth');
            $table->string('social_security_number');
            $table->string('email');
            $table->string('phone');
            $table->string('street');
            $table->string('city');
            $table->string('country');
            $table->string('zip_code');
            $table->foreignIdFor(User::class, 'broker_id');
            $table->string('spouse_first_name')->nullable();
            $table->string('spouse_last_name')->nullable();
            $table->string('spouse_date_of_birth')->nullable();
            $table->string('spouse_social_security_number')->nullable();
            $table->string('spouse_email')->nullable();
            $table->string('spouse_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
