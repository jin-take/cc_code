import { ethers } from 'ethers';
import 'dotenv/config';
const env = process.env

// Sepoliaテストネットへの接続を設定します。
const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

async function getBalance(): Promise<void> {
    const walletAddress:ethers.AddressLike = "0x47FD9A30F48a656D9062aDE956c65f0ec8e2186c";
    // 指定されたアドレスの残高を取得
    const balance = await sepoliaProvider.getBalance(walletAddress);
    // BigNumberをEther単位の文字列に変換します。
    const balanceInEther = ethers.formatEther(balance);

    console.log(`SepoliaのネットワークのETHの残高は: ${balanceInEther} ETH`);
}
getBalance();
