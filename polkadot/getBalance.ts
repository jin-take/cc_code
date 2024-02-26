import { ApiPromise, WsProvider } from '@polkadot/api';
import { decodeAddress } from '@polkadot/util-crypto';
import 'dotenv/config'
const env = process.env

type balanceInfo = {
    totalBalance:       number;
    stakeAmounr:        number;
    noStakeAmount:      number;
    AccountInfo:        mainAccount;
}

type mainAccount = {
    address:        string;
    addressHex:     string;
    addressType:    string;
    balance:        number;
    proxyAccounts:  proxyAccounts[];
}

type proxyAccounts = {
    address:    string;
    addressHex: string;
    balance:    number;
    proxyType:  string;
    delay:      number;
}

async function getBalance(address: string) {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    
    // メインアドレスの残高を取得
    const accountInfo = ((await api.query.system.account(address)).toHuman()) as any;
    const balance = parseInt(accountInfo.data.free.replace(/,/g, ''), 10) / 10**12; // カンマをなくして、数値に変換
    const publicKeyHex = `0x${Buffer.from(decodeAddress(address)).toString('hex')}`;

    // プロキシアドレスの取得と残高の計算
    const proxies = ((await api.query.proxy.proxies(address)).toHuman()) as any;
    let proxyAccountsArray: proxyAccounts[] = []; // この配列にプロキシアカウントの情報を格納
    let proxyBalances = 0;
    
    for (let i = 0; i < proxies[0].length; i++) {
        const proxyAddress: string = String(proxies[0][i].delegate);
        const proxyPublicKeyHex = `0x${Buffer.from(decodeAddress(proxyAddress)).toString('hex')}`;
        const proxyType = proxies[0][i].proxyType;
        const delay = proxies[0][i].delay;
        const proxyAccountInfo = ((await api.query.system.account(proxyAddress)).toHuman()) as any;
        const proxyBalance = parseInt(proxyAccountInfo.data.free.replace(/,/g, ''), 10) / 10**12;
        
        const proxyAccount: proxyAccounts = {
            address: proxyAddress,
            addressHex: proxyPublicKeyHex,
            balance: proxyBalance,
            proxyType: proxyType,
            delay: delay,
        };

        proxyAccountsArray.push(proxyAccount); // 配列にプロキシアカウント情報を追加
        proxyBalances += proxyBalance;
    }
    
    const mainAccountInfo: mainAccount = {
        address: address,
        addressHex: publicKeyHex,
        addressType: "main",
        balance: balance,
        proxyAccounts: proxyAccountsArray, // 修正された部分
    };

    
    
    const balanceInfo = {
        totalBalance:       proxyBalances + balance,
        stakeAmounr:        0,
        noStakeAmount:      0,
        AccountInfo:        mainAccountInfo
    }
    
    console.dir(balanceInfo, {depth:null})
    
    provider.disconnect();
}

// 使用例
const address = String(env.MAIN_WALLET); 
getBalance(address).catch(console.error);
