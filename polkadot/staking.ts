import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';

async function main() {
    // アカウントを取得
    const allAccounts = await web3Accounts();
    if (allAccounts.length === 0) {
        return console.error('No accounts found');
    }
    // ステークアカウントはどれになる？
    const stakerAccount = allAccounts[0]; // 最初のアカウントを使用

    // WebSocketプロバイダーを作成
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // ステーキングするバリデーターのアドレス
    const validatorAddress = 'バリデーターのアドレス';

    // ステーキングに使用する量（例：1 DOTをPlanck単位に変換）
    const amount = 1000000000000; // この値は例です。実際の量に応じて調整してください。

    // サインプロバイダーを取得
    const injector = await web3FromAddress(stakerAccount.address);

    // トランザクションを作成し、サインして送信
    await api.tx.staking
        .bond(validatorAddress, amount, 'Staked')
        .signAndSend(stakerAccount.address, { signer: injector.signer }, ({ status }) => {
            if (status.isInBlock) {
                console.log(`Transaction included at blockHash ${status.asInBlock}`);
            } else {
                console.log(`Current status: ${status.type}`);
            }
        });
}

main().catch(console.error);
