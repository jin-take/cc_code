import { ApiPromise, WsProvider } from '@polkadot/api';
import { decodeAddress } from '@polkadot/util-crypto';
import 'dotenv/config'
import { AccountInfo } from '@solana/web3.js';
const env = process.env

async function getBalance(address: string) {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    
    // メインアドレスの残高を取得
    const accountInfo = ((await api.query.system.account(address)).toHuman()) as any;
    const balance = parseInt(accountInfo.data.free.replace(/,/g, ''), 10) / 10**12; // カンマをなくして、数値に変換
    const publicKeyHex = `0x${Buffer.from(decodeAddress(address)).toString('hex')}`;

    // Eraの取得
    const eraCount = 5
    // 最新のEraの取得
    const currentEra = (await api.query.staking.currentEra()).toHuman() as string;
    console.log(currentEra)
    const currentEraInt = parseInt(currentEra.replace(/,/g, ''), 10); // カンマをなくして、数値に変換
    console.log(currentEraInt)
    let startEra = currentEraInt - eraCount;
    console.log(startEra)

    for (let era = startEra; era <= currentEraInt; era++) {
        const rewards = await api.query.staking.erasRewardPoints(era);
        // console.log(`Era: ${era}, Rewards: `, rewards.individual[address]?.toString());
        console.log(`Era: ${era}, Rewards: `, rewards.toHuman());
    }


    // // メインアカウントの報酬送料(totalRewardAmount)の取得
    // const totalRewardAmount = (await api.query.staking.validators(address)).toHuman()

    // console.log(totalRewardAmount)

    // // // メインアカウントの報酬履歴の取得
    // // const rewardHisotory = (await api.query.staking.claimedRewards(0, address)).toHuman() as any
    // // console.log(rewardHisotory)
    
    provider.disconnect();
}

// 使用例
const address = "5HHUFyfjPNysY3gF8piBdCg1ZwsgsGJw7vGdyyMkyU1KLDUu"
getBalance(address).catch(console.error);
