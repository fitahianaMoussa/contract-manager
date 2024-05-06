<?php

use App\Models\Age;
use App\Models\Option;
use App\Models\User;
use App\Models\Zone;
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
        Schema::create('price_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'broker_id');
            $table->foreignIdFor(Option::class);
            $table->foreignIdFor(Age::class);
            $table->foreignIdFor(Zone::class);
            $table->decimal('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_tables');
    }
};
