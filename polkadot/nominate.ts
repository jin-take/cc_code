import { ApiPromise, WsProvider } from '@polkadot/api';
import { AddressOrPair } from '@polkadot/api/types';
import { Keyring } from '@polkadot/keyring';
import { web3FromAddress } from '@polkadot/extension-dapp';
import type { KeyringPair } from './types.ts';
import 'dotenv/config';
const env = process.env

export async function nominate() {
    // Polkadot.js APIを使用してネットワークに接続
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // ノミネーター（ステーカー）のアカウントアドレス
    const nominatorAddress = String(env.NOMINATOR_ADDRESS);
    const nomAddressInfo = getNominateAddressInfo(nominatorAddress); // ノミネーター情報を取得

    // ノミネートしたいバリデーターのアドレスリスト
    const validators = [
        env.VALIDATOR_01,
        env.VALIDATOR_02,
        env.VALIDATOR_03,
    ];

    // ノミネート処理を実行
    // この操作には署名が必要なため、Polkadot{.js} Extensionや他のサイン方法を使用して実行する必要がある
    const unsub = await api.tx.staking
        .nominate(validators)
        .signAndSend(nominatorAddress, ({ status }) => {
            if (status.isInBlock) {
                console.log(`ノミネーションがブロック ${status.asInBlock} に含まれました`);
            } else {
                console.log(`現在のステータス: ${status.type}`);
            }
        });

    // コールバックを解除するにはunsub()を呼び出すとき
    // unsub();
    
    //接続を切るとき
    wsProvider.disconnect();
    
    return validators
}

nominate().catch(console.error);

async function getNominateAddressInfo(nominatorAddress: string): Promise<AddressOrPair|undefined> {
    const mainKeyring: Keyring = new Keyring();
    const mainPair: AddressOrPair = await mainKeyring.addFromAddress(nominatorAddress);
    return mainPair;
}