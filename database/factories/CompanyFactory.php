<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyName = fake()->company();

        return [
            'name' => $companyName,
            'email' => 'contact@'.preg_replace('/[^a-zA-Z0-9.]/', '.', strtolower($companyName)).'.com',
            'phone' => fake()->e164PhoneNumber(),
            'street' => fake()->streetAddress(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'zip_code' => fake()->postcode(),
        ];
    }
}
