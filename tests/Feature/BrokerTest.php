<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BrokerTest extends TestCase
{
    use RefreshDatabase;

    public function test_broker_page_is_displayed(): void
    {
        $user = User::factory()->create(['role' => 'ROLE_ADMIN', 'is_active' => true]);

        $response = $this->actingAs($user)->get(route('brokers.index'));

        $response->assertOk();
    }

    public function test_new_broker_can_be_added(): void
    {
        $user = User::factory()->create(['role' => 'ROLE_ADMIN', 'is_active' => true]);

        $response = $this->actingAs($user)->post(route('brokers.store'), [
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'password' => 'password',
            'confirm_password' => 'password',
            'is_active' => true,
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('brokers.store'));
    }
}
