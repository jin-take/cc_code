import axios from 'axios';

async function getTestnetETH(faucetURL: string, address: string) {
    try {
        // Prepare your request payload if necessary
        const payload = {
            address: address,
            // Add other required parameters based on the faucet's requirements
        };

        // Sending a POST request to the faucet
        const response = await axios.post(faucetURL, payload);
        console.log('Response from faucet:', response.data);
    } catch (error) {
        console.error('Error requesting testnet ETH:', error);
    }
}

// Example usage
const myAddress = '0xc20e03E025C3F40772f9bDc0F9BeD896fB5E3dCA';
const faucetURL = 'https://goerlifaucet.com/send'; // Replace with the actual faucet URL

getTestnetETH(faucetURL, myAddress);