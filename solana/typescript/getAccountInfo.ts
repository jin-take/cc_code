import { Connection, PublicKey, ParsedAccountData, AccountInfo } from '@solana/web3.js';



async function getAccountInfo(connection: Connection, address: string) {
    // アドレスの型を変換
    const pubKey: PublicKey = new PublicKey(address);
    
    // const accountInfo = await connection.getAccountInfoAndContext(pubKey);
    const accountInfo = await(
                            (
                                await connection.getParsedAccountInfo(pubKey)
                            ).value?.data as ParsedAccountData
                        ).parsed.info;
                        
    const data = await connection.getAccountInfo(pubKey);
    const dataLength = Number(await data?.data.length);
    
    const rentExemptReserve = await connection.getMinimumBalanceForRentExemption(200)
    const rentExemptReserve1byte = await connection.getMinimumBalanceForRentExemption(1)
    console.log("理想: ", rentExemptReserve)
    console.log("現実: ", Number((accountInfo.meta.rentExemptReserve / 10**9).toFixed(9)))
    
    console.log(0.00228288 / 0.00089784);
    
    
    // 569 epoch
    // 200 byte
    //
    
    
    return accountInfo;
}

async function main() {
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    const parentAddress: string = '6d7EEa6WSUQWGGBtFd6R2P2wN9EsW6w552nwwbA8Xewf';
    const accountInfo = await getAccountInfo(connection, parentAddress);
    // console.log(accountInfo);
}

main();