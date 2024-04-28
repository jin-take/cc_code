// import {  } from "@cosmjs/launchpad";

async function getTestnetTokens(faucetUrl: string, address: string): Promise<void> {
    const response = await fetch(`${faucetUrl}/credit?address=${address}`);
    if (!response.ok) {
        console.error('Failed to get tokens from the faucet:', response.statusText);
        return;
    }
    const data = await response.json();
    console.log('Faucet response:', data);
}

const testnetFaucetUrl = 'https://www.allthatnode.com/cosmos.dsrv'; // Update this with the actual faucet URL
const myTestnetAddress = 'cosmos1l550x4yh76hxh37lf5ag8u879dphknydgk8g0t'; // Update this with your testnet wallet address

getTestnetTokens(testnetFaucetUrl, myTestnetAddress).catch(console.error);
