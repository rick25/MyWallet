<?php

namespace App\Http\Controllers;

use App\Transfer;
use App\Wallet;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    public function store(Request $request)
    {
        $wallet = Wallet::find($request->wallet_id);    // se busca la billetera con ese id
        $wallet->money = $wallet->money + $request->amount;     // se suma el monto que viene del formulario
        $wallet->update();              // se actualiza la billetera

        $transfer = new Transfer();
        $transfer->description = $request->description;
        $transfer->amount = $request->amount;
        $transfer->wallet_id = $request->wallet_id;
        $transfer->save();

        return response()->json([
            'id' => $transfer->id,
            'description' => $request->description,
            'amount' => $transfer->amount,
            'wallet_id' => $transfer->wallet_id,
        ], 201);
    }
}
