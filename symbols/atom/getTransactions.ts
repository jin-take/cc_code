import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { LcdClient } from '@cosmjs/launchpad';
import axios from 'axios';

async function getTransactions(address: string) {
    try {
        // Tendermint34Clientの初期化
        const tmClient = await Tendermint34Client.connect("https://rpc-cosmoshub-4.keplr.app");

        // LcdClientの初期化
        const apiUrl = 'https://cosmos.blockpi.network/lcd/v1'
        // LCD APIを使ってトランザクションを取得
        const transactionsUrl = `${apiUrl}/cosmos/tx/v1beta1/txs?events=transfer.sender=${address}`;
        const response = await axios.get(transactionsUrl);
        
        console.log(response)
        // const transactions = response.data.txs;

        // console.log(`Found ${transactions.length} transactions for address ${address}`);
        // transactions.forEach((tx: any, idx: number) => {
        //     console.log(`Transaction ${idx + 1}:`, tx);
        // });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// 使用例
const address = 'cosmos1vz4f8prrh2vmtknzyh58yhqmgv43nlk0pdn6ef'; // ここに実際のアドレスを挿入してください
getTransactions(address);
