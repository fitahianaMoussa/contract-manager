<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SuperUserSeeder::class,
            // AdminSeeder::class,
            // CollaboratorSeeder::class,
            // BrokerSeeder::class,
            // BrokerCollaboratorSeeder::class,
            // BrokerManagerSeeder::class,
            // ClientSeeder::class,
            // ContractSeeder::class,
            // CompanySeeder::class,
            // ProductSeeder::class,
            // AgeSeeder::class,
            // OptionSeeder::class,
            // ZoneSeeder::class,
            // LocationSeeder::class,
            // PriceSeeder::class,
        ]);
    }
}
