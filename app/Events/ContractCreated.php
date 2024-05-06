<?php

namespace App\Events;

use App\Models\Contract;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContractCreated implements ShouldBroadcastNow, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(protected Collection $contracts)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('App.Models.Contract.Created'),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'contracts_count' => $this->contracts->count(),
            'income' => $this->contracts->sum('amount'),
            'pie' => [
                [
                    'name' => 'Clients non validés',
                    'amount' => $this->contracts->filter(fn (Contract $c) => ! $c->is_valid)->sum('amount'),
                ],
                [
                    'name' => 'Clients validés',
                    'amount' => $this->contracts->filter(fn (Contract $c) => $c->is_valid)->sum('amount'),
                ],
            ],
            'last_contracts' => $this->contracts->sortByDesc('created_at')->slice(0, 10),
        ];
    }
}
