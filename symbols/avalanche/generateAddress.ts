import { ethers } from 'ethers';

// Fuji Testnet に接続するアドレス、秘密鍵、公開鍵を生成する関数
function generateFujiTestnetAccount(): { address: Boolean, privateKey: string, publicKey: string } {
    // イーサリアムのプロバイダーを作成（Fuji Testnet に接続）
    const provider = new ethers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    ethers.JsonRpcProvider

    // generate random value as private key
    const randomPrivateKey = ethers.hexlify(ethers.randomBytes(32));

    // get public key from private key
    const publicKey = ethers.computeAddress(randomPrivateKey);

    // is the public key equaled address??
    const address = ethers.isAddress(publicKey)

    return {
        address:        address,
        privateKey:     randomPrivateKey,
        publicKey:      publicKey
    };
}

// Fuji Testnet のアドレス、秘密鍵、公開鍵を生成してコンソールに表示
const account = generateFujiTestnetAccount();
// trueであれば、アドレスと公開鍵が同じであるということ。
// ethの派生したものとなるので、同じはず。
console.log('Fuji Testnet Private Key:', account.address);      
console.log('Fuji Testnet Private Key:', account.privateKey);
console.log('Fuji Testnet Public Key:', account.publicKey);
