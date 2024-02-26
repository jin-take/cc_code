// ref_url: https://polkadot.js.org/docs/keyring/examples/create-account/
import { Keyring } from '@polkadot/keyring';
import { stringToU8a } from '@polkadot/util';
import type { KeyringPair } from './types.ts';

// メインアカウントの作成
async function generateMainAccount(seed: string): Promise<KeyringPair|undefined> {
    const MAIN_ACCOUNT_SEED = 'main'.padEnd(32, seed);
    const mainKeyring: Keyring = new Keyring();
    const mainPair: KeyringPair = await mainKeyring.addFromSeed(stringToU8a(MAIN_ACCOUNT_SEED));
    
    /** ここから先はなくてもよい!! */
    // アドレスの検証と表示
    const address = mainKeyring.getPair(mainPair.address).address;
    // addressRaw == publicKey になる。
    const addressRaw = mainKeyring.getPair(mainPair.address).addressRaw.toString();
    const publicKey = mainKeyring.getPair(mainPair.address).publicKey.toString();
    const decodeAddress = mainKeyring.decodeAddress(address).toString();
    
    // 検証: addressをデコードしたものが、addressRaw/publicKeyであること
    if (decodeAddress == addressRaw && decodeAddress == publicKey) {
        return mainPair; 
    } else {
        return undefined;
    }
}

// プロキシアカウントの作成
async function generateProxyAccount(seed: string): Promise<KeyringPair|undefined> {
    const PROXY_ACCOUNT_SEED = 'proxy'.padEnd(32, seed);
    const proxyKeyring: Keyring = new Keyring();
    const proxyPair: KeyringPair = await proxyKeyring.addFromSeed(stringToU8a(PROXY_ACCOUNT_SEED));

    /** ここから先はなくてもよい!! */
    // アドレスの検証と表示
    const address = proxyKeyring.getPair(proxyPair.address).address;
    // addressRaw == publicKey になる。
    const addressRaw = proxyKeyring.getPair(proxyPair.address).addressRaw.toString();
    const publicKey = proxyKeyring.getPair(proxyPair.address).publicKey.toString();
    const decodeAddress = proxyKeyring.decodeAddress(address).toString(); 
    
    // 検証: addressをデコードしたものが、addressRaw/publicKeyであること
    if (decodeAddress == addressRaw && decodeAddress == publicKey) {
        return proxyPair; 
    } else {
        return undefined;
    }
}

// シードフレーズのためのランダムな文字列の生成
const generateRandomString = (charCount = 7): string => {
    const str = Math.random().toString(36).substring(2).slice(-charCount)
    return str.length < charCount ? str + 'a'.repeat(charCount - str.length) : str
}

async function main(){
    // アカウントの生成
    const header = 'sakenomi_dev_'
    // ランダムに文字列を入れることで生成されるアドレスの内容が変わる → シードが秘密鍵の代わりになる
    const random = await generateRandomString(10)
    const seed: string = header + random
    const mainAccount = await generateMainAccount(seed);
    const proxyAccount = await generateProxyAccount(seed);

    console.log(`シードフレーズ: ${seed}`)
    console.log(`メインアカウント: ${mainAccount?.address}`);
    console.log(`プロキシアカウント: ${proxyAccount?.address}`);
}

main();

