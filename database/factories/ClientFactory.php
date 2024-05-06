<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maleFirstName = fake()->firstName('male');
        $maleLastName = fake()->lastName('male');
        $femaleFirstName = fake()->firstName('female');
        $femaleLastName = fake()->lastName('female');

        return [
            'first_name' => $maleFirstName,
            'last_name' => $maleLastName,
            'date_of_birth' => fake()->date('Y-m-d', (new \DateTime())->sub(new \DateInterval('P'. 18 .'Y'))),
            'social_security_number' => strval(fake()->randomNumber(8, true)),
            'email' => strtolower($maleFirstName).strtolower($maleLastName).'@example.com',
            'phone' => fake()->e164PhoneNumber(),
            'street' => fake()->streetAddress(),
            'city' => fake()->city(),
            'country' => fake()->country(),
            'zip_code' => fake()->postcode(),
            'spouse_first_name' => $femaleFirstName,
            'spouse_last_name' => $femaleLastName,
            'spouse_date_of_birth' => fake()->date(),
            'spouse_social_security_number' => strval(fake()->randomNumber(8, true)),
            'spouse_email' => strtolower($femaleFirstName).strtolower($femaleLastName).'@example.com',
            'spouse_phone' => fake()->e164PhoneNumber(),
        ];
    }
}
