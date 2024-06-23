import { DirectSecp256k1Wallet, Registry, coins } from '@cosmjs/proto-signing';
import { StargateClient, SigningStargateClient, isDeliverTxSuccess } from '@cosmjs/stargate';

const rpcEndpoint = "https://rpc.sentry-01.theta-testnet.polypore.xyz"; // theta001 テストネットのRPCエンドポイント
const mnemonic = "toward behave next lumber follow toddler fox veteran minimum song adapt hub find deliver clap humor survey ready can match post inject unable give"; // あなたのウォレットのニーモニック
const privateKey = Buffer.from(mnemonic, 'hex')
const address = "cosmosvaloper1gpx52r9h3zeul45amvcy2pysgvcwddxrgx6cnv"
const publicKey = Buffer.from(address, 'hex')

// バリデーター：https://explorer.polypore.xyz/theta-testnet-001/staking/cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3
const validatorAddress = "cosmos1tflk30mq5vgqjdly92kkhhq3raev2hnzldd74z"; // ステーキングするバリデーターのアドレス


async function main() {
    // 秘密鍵からウォレットを生成
    const wallet = await DirectSecp256k1Wallet.fromKey(privateKey, "cosmos");

    // クライアントの初期化
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    // アカウント情報の取得
    const [firstAccount] = await wallet.getAccounts();

    // ステーキングする額
    const amount = coins(1000000, "uatom"); // 1 ATOM（単位はuatomで1ATOM=1,000,000uatom）

    // デリゲートトランザクションの作成
    const fee = {
        amount: coins(100000, "uatom"),
        gas: "200000", // ガスリミット
    };

    const msgDelegate = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: {
            delegatorAddress: firstAccount.address,
            validatorAddress: validatorAddress,
            amount: amount[0],
        },
    };

    // トランザクションの送信
    const result = await client.signAndBroadcast(firstAccount.address, [msgDelegate], fee);
    await isDeliverTxSuccess(result)

    console.log("Successfully delegated:", result);
}

main().catch(console.error);
