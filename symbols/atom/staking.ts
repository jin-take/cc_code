import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, coins } from '@cosmjs/stargate';

const mnemonic = 'book still horror family vault okay horse wing mosquito bless umbrella couple online furnace lobster token demand snap aspect choose animal december bind sphere'; // ご自身のニーモニックに置き換えてください
const rpcEndpoint = 'https://endpoints-testnet-1.lavanet.xyz:443/gateway/cos5/rpc-http/cdb3924c11c503a8409192cde3b911b1'; // 使用するRPCエンドポイントに置き換えてください
const validatorAddress = 'cosmosvaloper1v5y0tg0jllvxf5c3afml8s3awue0ymju89frut'; // 委任したいバリデーターのアドレスに置き換えてください
const delegatorAddress = 'cosmos1l550x4yh76hxh37lf5ag8u879dphknydgk8g0t'; // あなたのコスモスアドレスに置き換えてください
const amountToDelegate = '2000'; // uatom単位でデリゲートする量 (1 ATOM = 1,000,000 uatom)

async function delegateTokens() {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'cosmos' });
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    const amount = coins(amountToDelegate, 'uatom');
    const fee = {
        amount: coins(200, 'uatom'), // トランザクション手数料に使用するuatomの量
        gas: '200', // 使用するガスの量
    };

    const message = {
        delegatorAddress,
        validatorAddress,
        amount,
    };

    const result = await client.delegateTokens(delegatorAddress, validatorAddress, amount[0], fee);

    console.log(`Successfully delegated! Transaction hash: ${result.transactionHash}`);
}

delegateTokens().catch(console.error);
