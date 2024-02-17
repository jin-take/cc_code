import {Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

main();

function main() {
    // ネットワークの設定（テストネット）
    const network = new Connection(clusterApiUrl('testnet'), 'confirmed');
    // アカウント作成の実行
    createAddress(network);
}


async function createAddress(network: Connection) {
    // アドレスの情報の格納先を設定（初期化）
    // アカウント情報を格納するためのインターフェース
    interface AccountInfo {
        publicKey: string;
        secretKey: string;
        balance: number;
    }
    const accountInfo: Array<AccountInfo> = [];
    
    // 新しいウォレット(キーペア)を生成
    const account = await Keypair.generate();
    
    // フォーセットの受け取り
    const airdrop = await network.requestAirdrop(
        account.publicKey,
        LAMPORTS_PER_SOL, // 1 SOLをリクエスト(max)
    );
    
      // トランザクションの確認を待つ
    await network.confirmTransaction(airdrop);
    
    // 残高を取得
    const balance = await network.getBalance(account.publicKey);
    
    // アカウント情報としてプッシュ
    await accountInfo.push({
        publicKey: account.publicKey.toBase58(), 
        secretKey: account.secretKey.toString(),
        balance: balance
    });
    
    console.log(accountInfo);
}





