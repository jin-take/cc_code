import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';
const env = process.env

// testnetのAPI（メインネットの場合は、testnetをmainnetにしてください。）
const API_URL = 'https://stacks-node-api.testnet.stacks.co';
const walletAddress: string = String(env.MAIN_ADDRESS); 

async function getStacksWalletBalance(address: string): Promise<number> {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/extended/v1/address/${address}/balances`);
        const balanceMicrostacks: number = response.data.stx.balance; 
        // 過分性が６桁なので、補完する
        const balanceSTX: number = balanceMicrostacks / 1_000_000;
        return balanceSTX;
    } catch (error) {
        console.error('Error getting wallet balance:', error);
        throw error;
    }
}

// 残高を表示する
getStacksWalletBalance(walletAddress)
    .then(balance => console.log(`ウォレット残高: ${balance}STX`))
    .catch(error => console.error(error));
