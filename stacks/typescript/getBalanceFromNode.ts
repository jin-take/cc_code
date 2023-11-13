import { StacksTestnet } from "@stacks/network";
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';
const env = process.env

const network = new StacksTestnet({ url: env.STACKS_NODE_URL });
const walletAddress: string = String(env.MAIN_ADDRESS); 

const getAccountBalanceApiUrl: string = network.getAccountExtendedBalancesApiUrl(walletAddress)

async function getStacksWalletBalance(): Promise<number> {
    try {
        const response: AxiosResponse = await axios.get(getAccountBalanceApiUrl);
        const balanceMicrostacks: number = response.data.stx.balance; 
        // 過分性が６桁なので、補完する
        const balanceSTX: number = balanceMicrostacks / 1_000_000;
        return balanceSTX;
    } catch (error) {
        console.error('ウォレットの残高取得に失敗:', error);
        throw error;
    }
}

// 残高を表示する
getStacksWalletBalance()
    .then(balance => console.log(`ウォレット残高: ${balance}STX`))
    .catch(error => console.error(error));
