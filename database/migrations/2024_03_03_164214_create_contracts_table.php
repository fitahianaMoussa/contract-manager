<?php

use App\Models\Client;
use App\Models\Product;
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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['active', 'cancelled', 'suspended'])->default('active');
            $table->date('start_date');
            $table->date('end_date');
            $table->date('due_date')->nullable();
            $table->decimal('amount', 10, 2, true);
            $table->enum('payment_frequency', ['monthly', 'quaterly', 'annual'])->default('annual');
            $table->foreignIdFor(Client::class);
            $table->foreignIdFor(Product::class);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
