import { DirectSecp256k1HdWallet, Registry } from "@cosmjs/proto-signing";
import { SigningStargateClient, StargateClient, MsgDelegate } from "@cosmjs/stargate";
import { assertIsBroadcastTxSuccess } from "@cosmjs/stargateclient"
import { coins } from "@cosmjs/amino";

// RPC エンドポイント
const rpcEndpoint = "https://rpc.sentry-01.theta-testnet.polypore.xyz"; // 実際のエンドポイントに置き換えてください

async function delegateTokens(delegatorAddress: string, validatorAddress: string, amount: string, denom: string, mnemonic: string) {
    // デリゲーターのウォレットを生成
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "cosmos" });

    // SigningStargateClient を作成
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    // デリゲートするトークンの量と種類
    const delegatingTokens = coins(amount, denom);

    // メッセージを作成
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.fromPartial({
            delegatorAddress,
            validatorAddress,
            amount: delegatingTokens[0],
        }),
    };

    // トランザクションを送信
    const fee = {
        amount: coins("5000", "uatom"), // 手数料の設定（必要に応じて調整）
        gas: "200000", // ガスリミット
    };

    const result = await client.signAndBroadcast(delegatorAddress, [msg], fee, "Delegate via CosmJS");

    // トランザクションの結果を確認
    assertIsBroadcastTxSuccess(result);

    console.log("Successfully delegated:", result);
}

// デリゲーターのアドレス、バリデーターのアドレス、デリゲートする量、デノミネーション、および助記符
delegateTokens("cosmos1...", "cosmosvaloper1...", "1000000", "uatom", "your mnemonic here");
