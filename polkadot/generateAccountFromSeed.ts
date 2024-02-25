// ref_url: https://polkadot.js.org/docs/keyring/examples/create-account/
import { Keyring } from '@polkadot/keyring';
// import { stringToU8a } from '@polkadot/util';
import type { KeyringPair } from './types.ts';

// メインアカウントの作成
async function generateAccount(seed: string): Promise<KeyringPair|undefined> {
    const keyring: Keyring = new Keyring();
    const keyPair: KeyringPair = await keyring.addFromMnemonic(seed);
    
    // console.dir(await keyPair.toJson(), {depth:null})
    return keyPair
}

async function main(){
    // アカウントの生成
    const seed = 'icon absorb used health swap case moon outside model liquid fat pyramid'
    const account = await generateAccount(seed);
    
    
    const address = "5DFNFGFF18bDCFQntd65k4tZCbLCqNpyiu1iMn1SWWGEpq5f"
    const keyring: Keyring = new Keyring();
    const keyPair: KeyringPair = await keyring.addFromAddress(address);
    

    // console.log(`シードフレーズ: ${seed}`)
    // console.log(`メインアカウント: ${mainAccount?.address}`);
    
    console.log(keyPair)
}

main();

