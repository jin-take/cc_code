import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { KeyringPair } from './types.ts';
import { AddressOrPair } from '@polkadot/api/types/submittable';
import 'dotenv/config'
const env = process.env

// メインアカウントの作成
async function generateMainAccount(seed: string): Promise<KeyringPair|undefined> {
    const MAIN_ACCOUNT_SEED = 'main'.padEnd(32, seed);
    const mainKeyring: Keyring = new Keyring();
    const mainPair: KeyringPair = await mainKeyring.addFromSeed(stringToU8a(MAIN_ACCOUNT_SEED));
    return mainPair
}

// プロキシアカウントの作成
async function generateProxyAccount(seed: string): Promise<KeyringPair|undefined> {
    const PROXY_ACCOUNT_SEED = 'proxy'.padEnd(32, seed);
    const proxyKeyring: Keyring = new Keyring();
    const proxyPair: KeyringPair = await proxyKeyring.addFromSeed(stringToU8a(PROXY_ACCOUNT_SEED));
    return proxyPair
}


/**
メインアカウントとプロキシアカウントの連携
*/
async function connectMainAndProxyAccount() {
    // シードフレーズの読み込み
    const seed = env.SEED_FRASE;
    const mainAccount = await generateMainAccount(this.seed);
    const proxyAccount = await generateProxyAccount(this.seed);
    
    try {
        // Westend: テストネットへの接続を初期化
        const provider = new WsProvider('wss://westend-rpc.polkadot.io');
        const api = (await ApiPromise.create({ provider }));
        // プロキシ設定トランザクションの作成と送信
        // 注意: この操作には手数料が必要だからフォーセットを先にとっておくこと
        const tx = api.tx.proxy.addProxy(proxyAccount?.address, 'Any', 0);
        await tx.signAndSend((mainAccount as AddressOrPair), ({ status }) => {
            if (status.isInBlock) {
                console.log(`トランザクションがブロック ${status.asInBlock} に含まれました`);
            }
        });
        provider.disconnect(); // 接続を切断
    } catch(error) {
        console.log(error)
    }
}


// 実行
connectMainAndProxyAccount()