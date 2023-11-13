import axios from 'axios';
require('dotenv').config();
const env = process.env

async function getUtxosForTestnetAddress(address: string): Promise<any> {
    const url = `https://blockstream.info/testnet/api/address/${address}/utxo`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching UTXOs:', error);
        return null;
    }
}

// 使用例
const address: string = String(env.ADDRESS_A);
getUtxosForTestnetAddress(address)
    .then(utxos => console.log(utxos))
    .catch(error => console.error(error));