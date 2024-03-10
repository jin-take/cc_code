import { ethers } from 'ethers';

// Fuji Testnet に接続するアドレス、秘密鍵、公開鍵を生成する関数
function generateFujiTestnetAccount(): { address: string, privateKey: string, publicKey: string } {
    // イーサリアムのプロバイダーを作成（Fuji Testnet に接続）
    const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

    // ランダムな秘密鍵を生成
    const randomPrivateKey = ethers.utils.hexlify(ethers.utils.randomBytes(32));

    // 秘密鍵から公開鍵を取得
    const publicKey = ethers.utils.computePublicKey(randomPrivateKey);

    // 公開鍵からアドレスを生成
    const address = ethers.utils.computeAddress(publicKey);

    return {
        address: address,
        privateKey: randomPrivateKey,
        publicKey: publicKey
    };
}

// Fuji Testnet のアドレス、秘密鍵、公開鍵を生成してコンソールに表示
const account = generateFujiTestnetAccount();
console.log('Fuji Testnet Address:', account.address);
console.log('Fuji Testnet Private Key:', account.privateKey);
console.log('Fuji Testnet Public Key:', account.publicKey);
