import * as web3 from '@solana/web3.js';

async function getBalance() {
    // Solanaクラスタ（ネットワーク）を設定
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

    // 残高を確認したいアドレスを設定
    const address = new web3.PublicKey('<ここにアカウント>');

    try {
        // 残高を取得
        const balance = await connection.getBalance(address);
        
        console.log(web3.LAMPORTS_PER_SOL);

        // 単位をSOLに変換して表示
        console.log(`アドレス: ${address}`)
        console.log(`残　　高: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error('残高取得ができませんでした。エラー詳細:', error);
    }
}

getBalance();
