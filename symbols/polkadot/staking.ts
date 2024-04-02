import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import { Keyring } from '@polkadot/keyring';

// メインアカウントでのstaking処理

async function main() {
    // WebSocketプロバイダーを作成
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // メインアカウントの設定
    const address = "5DFNFGFF18bDCFQntd65k4tZCbLCqNpyiu1iMn1SWWGEpq5f"

    // ステーキングするバリデーターのアドレス
    // 暫定で動いていそうなバリデータを選択
    const validatorAddress = '5C864nyotaG4cNoR3YBUqnPVnnvqF1NN1s9t9CuAebyQkQGF';


    ////

    // キーリングを初期化して、ステーキングを行うアカウントを準備
    const keyring = new Keyring({ type: 'sr25519' });
    const mainAccount = keyring.addFromUri('//Alice'); // 秘密鍵やニーモニックを使用


    // ステーキングする額（例：1 DOT）
    const amount = 1n * 10n**12n; // 1 DOT = 10^12 Planck

    // ステーキングトランザクションを作成し、送信
    const transfer = api.tx.staking.bond(validatorAddress, amount, 'Staked');
    const hash = await transfer.signAndSend(mainAccount);

    console.log(`トランザクションが送信されました。ハッシュ: ${hash.toString()}`);

    ///

    // サインプロバイダーを取得
    const injector = await web3FromAddress(address);

    // トランザクションを作成し、サインして送信
    await api.tx.staking
        .bond(validatorAddress, amount, 'Staked')
        .signAndSend(address, { signer: injector.signer }, ({ status }) => {
            if (status.isInBlock) {
                console.log(`Transaction included at blockHash ${status.asInBlock}`);
            } else {
                console.log(`Current status: ${status.type}`);
            }
        });
}

main().catch(console.error);
