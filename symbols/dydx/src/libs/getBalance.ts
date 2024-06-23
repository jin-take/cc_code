import {
    BECH32_PREFIX,
    LocalWallet,
    IndexerClient, 
    Network,
    ValidatorClient,
} from '@dydxprotocol/v4-client-js';


async function getWalletInfo() {
    // setting up network for testnet and client config
    const NETWORK = Network.testnet();
    const client = await ValidatorClient.connect(NETWORK.validatorConfig);


    const mnemonic = 'couch diesel grow mutual river dawn happy settle sword vanish husband wonder hotel pioneer grit impose sibling amount bottom must find jazz kitchen napkin';
    const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
    const balances = await client.get.getAccountBalances(wallet.address as string)
    const amount = Number(balances[0].amount) / 10**18
    
    console.log("address", wallet.address)
    console.log("balances", amount)
}   

getWalletInfo()

