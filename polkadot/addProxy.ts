import { Keyring } from '@polkadot/keyring';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AddressOrPair } from '@polkadot/api/types/submittable';
import 'dotenv/config'
const env = process.env

/**
メインアカウントとプロキシアカウントの連携
*/
async function addProxy() {
    try {
        // Westend: テストネットへの接続を初期化
        const provider = new WsProvider('wss://westend-rpc.polkadot.io');
        const api = (await ApiPromise.create({ provider }));
        
        // メインアカウントのKeypair情報を取得
        // アドレス："5DFNFGFF18bDCFQntd65k4tZCbLCqNpyiu1iMn1SWWGEpq5f";
        const keyring: Keyring = new Keyring({ type: 'sr25519' });
        const keyPair = await keyring.addFromMnemonic(String(env.SEED_WALLET));
        
        // プロキシ設定トランザクションの作成と送信
        // 注意: この操作には手数料が必要だからフォーセットを先にとっておくこと
        // アドレス：5HNZt2eJikJ8uvFsJAqpjUxd3SN54fRcoRvN22pDgRhoBdYU
        const proxyAddress = env.PROXY_WALLET;
        const tx = api.tx.proxy.addProxy(proxyAddress, 'Any', 0);
        await tx.signAndSend((keyPair as AddressOrPair), ({ status }) => {
            if (status.isInBlock) {
                console.log(`トランザクションがブロック ${status.asInBlock} に含まれました`);
            }
        });
        // provider.disconnect(); // 接続を切断
    } catch(error) {
        console.log(error);
    }
}

// 実行
addProxy();