<?php

namespace Database\Seeders;

use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = PasswordGenerator::generate();
        $newUser = User::factory()->count(1)->create([
            'role' => 'ROLE_ADMIN',
            'password' => Hash::make($password),
            'is_active' => true,
        ]);
        Mail::to($newUser->email)->send(new UserCreated($newUser, $password));
    }
}
