import { StacksTestnet } from '@stacks/network';
import {
    makeSTXTokenTransfer,
    broadcastTransaction,
    AnchorMode,
} from '@stacks/transactions';
import { BigNumber } from 'bignumber.js';

const API_URL: string = 'https://stacks-node-api.testnet.stacks.co';
const senderKey: string = '4b6094aeed2a0e57be6210f61e390118b426d34288ba2b151f92a9676ff50da801';
const recipient: string = 'STD03R5CVX6M54DGVTFZKKDZB7T39BFEJZDCY2WD';
const amountToSend: BigNumber = new BigNumber(5000);   // 送金額をここに。ただし、1 STX = 1,000,000 microstacksなので、マイクロスタックの単位で考える。
const network = new StacksTestnet();


async function createAndBroadcastTransaction() {
    try {
        // 1. トランザクションの作成
        const txOptions = {
            recipient,
            amount: amountToSend.toString(),
            senderKey,
            network,
            anchorMode: AnchorMode.Any,
            memo: 'Test transaction',
        };
    
        // 2. トランザクションへの署名
        // トランザクションは送信者の公開鍵と共に作成された時に自動で署名されるようになっている。
        const transaction = await makeSTXTokenTransfer(txOptions);
    
        // 3. トランザクションのブロードキャスト
        const broadcastResponse = await broadcastTransaction(transaction, network);
    
        console.log('ブロードキャストトランザクションのレスポンス:', broadcastResponse);
        if (broadcastResponse.hasOwnProperty('error')) {
            throw new Error(`エラー！！: ${broadcastResponse.error}`);
        }
        
        return broadcastResponse;
    } catch (error) {
        console.error('失敗！！！！:', error);
        throw error;
    }
}

// Use the function
createAndBroadcastTransaction()
    .then(response => console.log('ブロードキャスト成功！！！！:', response))
    .catch(error => console.error(error));
