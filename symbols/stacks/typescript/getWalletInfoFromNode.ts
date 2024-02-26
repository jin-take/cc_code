import { AccountsApi, Configuration } from '@stacks/blockchain-api-client';
import 'dotenv/config';
const env = process.env

async function getWalletInfo() {
    // Setting wallet address
    const walletAddress: string = String(env.RECEIPT_ADDRESS);
    
    // Endpoint Setting of QuickNode
    const quickNodeUrl: string = String(env.STACKS_NODE_URL);

    // Settinf of Stacks API client
    const configuration = new Configuration({
        fetchApi: fetch,
        basePath: quickNodeUrl
    });

    const accountsApi = new AccountsApi(configuration);

    try {
        // get wallet address
        const walletInfo = await accountsApi.getAccountInfo({
            principal: walletAddress
        });

        console.log(walletInfo);
    } catch (error) {
        console.error(error);
    }
}

// execute
getWalletInfo();
