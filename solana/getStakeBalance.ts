import * as web3 from '@solana/web3.js';

async function getStakeAccounts(publicKey: web3.PublicKey) {
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
    
    const stakeAccounts = await connection.getParsedProgramAccounts(
        web3.StakeProgram.programId,
        {
        filters: [
            {
            memcmp: {
                offset: 12,
                bytes: publicKey.toBase58(),
            },
            },
            {
            memcmp: {
                offset: 44,
                bytes: publicKey.toBase58(),
            },
            },
        ],
        }
    );
    
    console.log(`ステークアカウント数は ${stakeAccounts.length} アカウントでした。`);
    
    let totalBalance = 0;
    let amounts = 0;
    let data: [number, number]
    
    for (const account of stakeAccounts) {
        const stakeAccountInfo = await connection.getParsedAccountInfo(account.pubkey);
        const stakeInfo = stakeAccountInfo.value?.data as web3.ParsedAccountData;
        
        if (stakeInfo && stakeInfo.program === 'stake' && stakeInfo.parsed.info) {
            const stakeAmount = stakeInfo.parsed.info.stake.delegation.stake / web3.LAMPORTS_PER_SOL;
            const stakeFee = stakeInfo.parsed.info.meta.rentExemptReserve / web3.LAMPORTS_PER_SOL;
            const balance = stakeAmount + stakeFee;
            
            // 加算
            amounts += stakeAmount;
            totalBalance += balance;
        }
    }
    data = [totalBalance, amounts];
    return data
}
        
async function getBalance() {
    const publicKey = new web3.PublicKey('<ここにアドレス>');
    const data = await getStakeAccounts(publicKey);
    console.log("残高: ", data[0]);
    console.log("総ステーク数量: ", data[1]);
}

getBalance();
