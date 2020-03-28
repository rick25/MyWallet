<?php

use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $wallet = factory(App\Wallet::class)->create();
        factory(App\Transfer::class, 3)->create([
            'wallet_id' => $wallet->id,
        ]);
    }
}
