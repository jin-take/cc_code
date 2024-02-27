import * as oasis from '@oasisprotocol/client';

async function createAccount() {
    // ニーモニック
    const mnemonic = oasis.hdkey.HDKey.generateMnemonic();
    console.log(`Mnemonic: ${mnemonic}`);
    
    
}

createAccount().catch(e => {
    console.error(e);
});
