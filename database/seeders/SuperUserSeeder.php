<?php

namespace Database\Seeders;

use App\Mail\UserCreated;
use App\Models\User;
use App\Utils\PasswordGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class SuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (! app()->environment(['local', 'testing'])) {
            $password1 = PasswordGenerator::generate();
            $newUser1 = User::factory()->create([
                'last_name' => 'Boudalia',
                'first_name' => 'Ahmed',
                'email' => 'Ahmed.boudalia@hotmail.fr',
                'role' => 'ROLE_SUPERUSER',
                'password' => Hash::make($password1),
                'is_active' => true,
            ]);
            Mail::to($newUser1->email)->send(new UserCreated($newUser1, $password1));
        }

        $password2 = PasswordGenerator::generate();
        $newUser2 = User::factory()->create([
            'last_name' => 'Salimo',
            'first_name' => 'Harris',
            'email' => 'harrismailasalimo@gmail.com',
            'role' => 'ROLE_SUPERUSER',
            'password' => Hash::make($password2),
            'is_active' => true,
        ]);
        Mail::to($newUser2->email)->send(new UserCreated($newUser2, $password2));
    }
}
