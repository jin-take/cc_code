import { StacksTestnet, broadcastTransaction, AnchorMode } from '@stacks/network';
import { makeSTXTokenTransfer, getAddressFromPrivateKey } from '@stacks/transactions';

// Define your function to mine Stacks tokens
async function mineStacksTokens(privateKey: string, recipientAddress: string, amount: number): Promise<void> {
    // Configure the network - using testnet in this example
    const network = new StacksTestnet();

    // Get your address from the private key
    const senderAddress = getAddressFromPrivateKey(privateKey, network.version);

    // Create a token transfer transaction
    const transaction = await makeSTXTokenTransfer({
        recipient: recipientAddress,
        amount: amount.toString(), // Ensure this is a string representation of the amount
        senderKey: privateKey,
        network: network,
        anchorMode: AnchorMode.OnChainOnly
    });

    // Broadcast the transaction to the network
    try {
        const txResult = await broadcastTransaction(transaction, network);
        console.log('Transaction result:', txResult);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}


const senderPrivateKey: string = "STJDPXAF92T22NSMDF9C8ZZDAHJX9XRED25ZYDK2"
const receiptAddress: string = "4b6094aeed2a0e57be6210f61e390118b426d34288ba2b151f92a9676ff50da801"
mineStacksTokens(senderPrivateKey, receiptAddress, 1000);
