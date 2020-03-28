<?php

namespace Tests\Feature;

use App\Transfer;
use App\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @internal
 * @coversNothing
 */
class WalletTest extends TestCase
{
    use RefreshDatabase;

    public function testGetWallet()
    {
        $wallet = factory(Wallet::class)->create();
        factory(Transfer::class, 3)->create([
            'wallet_id' => $wallet->id,
        ]);

        $response = $this->json('GET', '/api/wallet');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'id', 'money', 'transfers' => [
                    '*' => [
                        'id', 'amount', 'description', 'wallet_id',
                    ],
                ],
            ])
        ;

        $this->assertCount(3, $response->json()['transfers']);
    }
}
