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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('firm_name')->nullable();
            $table->string('firm_address')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', [
                'ROLE_SUPERUSER',
                'ROLE_ADMIN',
                'ROLE_COLLABORATOR',
                'ROLE_BROKER',
                'ROLE_BROKER_COLLABORATOR',
                'ROLE_BROKER_MANAGER',
            ])->default('ROLE_COLLABORATOR');
            $table->foreignId('broker_id')->nullable()->constrained('users')->onDelete('SET NULL');
            $table->boolean('is_active')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
