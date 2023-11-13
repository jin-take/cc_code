import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';
const env = process.env

// testnetのAPI（メインネットの場合は、testnetをmainnetにしてください。）
const API_URL = 'https://stacks-node-api.testnet.stacks.co';
const walletAddress: string = String(env.RECEIPT_ADDRESS);

async function getStacksAllEvents(address: string) {
    try {
        const response: AxiosResponse = await axios.get(`${API_URL}/extended/v1/address/${address}/assets`);
        console.log(response.data)
        return response;
    } catch (error) {
        console.error('取得にミスった:', error);
        throw error;
    }
}

// 残高を表示する
getStacksAllEvents(walletAddress);
