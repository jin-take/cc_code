import { ApiPromise, WsProvider } from '@polkadot/api';
import 'dotenv/config'
const env = process.env

async function getBalance(address: string) {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });

    // 指定されたアドレスの残高を取得
    const accountInfo = ((await api.query.system.account(address)).toHuman()) as any;

    // 残高を表示
    const free = parseInt(accountInfo.data.free.replace(/,/g, ''), 10); // カンマをなくして、数値に変換
    console.log(`${address} の残高: ${free/10**12} DOT`);
    
    provider.disconnect();
}

// 使用例
const address = String(env.PROXY_ACCOUNT); 
getBalance(address).catch(console.error);
