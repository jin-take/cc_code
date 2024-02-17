import { Connection, PublicKey, StakeProgram } from '@solana/web3.js';

async function findStakeAccounts(connection: Connection, normalAddress: string) {


    // 通常のアドレスの公開鍵を作成
    const publicKey = new PublicKey(normalAddress);

    // 通常のアドレスに関連するすべてのアカウントを取得
    const accounts = await connection.getParsedProgramAccounts(
        StakeProgram.programId, // ステークプログラムのID
        {
            filters: [
                {
                    dataSize: StakeProgram.space, // ステークアカウントのデータサイズでフィルタリング
                },
                {
                    memcmp: {
                        offset: 12, // ステークアカウント構造体内での所有者の位置
                        bytes: publicKey.toBase58(), // 通常のアドレスの公開鍵
                    },
                },
            ],
        }
    );
    
    // 取得したアカウントに対して、ステークアカウントのpubkeyを取得し、Base58形式の文字列に変換
    // これでアカウントの文字列が見れる
    const accountPublickeys = accounts.map(account => account.pubkey.toBase58())
    // console.log("アカウント: ", accountPubleys)
    return accountPublickeys;
}


async function getRewardsTx(connection: Connection, accountPubkeys: string[]) {
    for(let i = 0; i < accountPubkeys.length; i++) {
        // ステークアカウント
        const publicKey = await new PublicKey(accountPubkeys[i]);
        console.log(`アカウント ${i+1} は ${publicKey} `)
        
        // 最新の報酬のデータ取得
        const latestReward = await connection.getInflationReward([publicKey]);
        console.log(`アカウント ${i+1} の最新の報酬データ ${JSON.stringify(latestReward)}`)
        
        // 最新の報酬の数量の取得：solは9桁まで有効なので、10**9で割る
        const rewardAmount: number = Number(latestReward[0]?.amount) / 10**9
        console.log(`アカウント ${i+1} の最新の報酬データの数量は ${rewardAmount}`);
        
        const stakeAccountInfo = await connection.getParsedAccountInfo(publicKey);
        const stakeAccountData = stakeAccountInfo
        
        console.log(stakeAccountData)
        
    }
}


async function main() {
    const normalAddress: string = 'EDuVpfE29Rb7S9q1bM5Db8WwtqMAPbZb8bqrfNcNt24c';
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    
    // ステークアドレスの取得
    const accountPubkeys = await findStakeAccounts(connection, normalAddress);
    
    // ステークアドレスから、最新の報酬を取得
    const rewardsTx = await getRewardsTx(connection, accountPubkeys)
}

main()




