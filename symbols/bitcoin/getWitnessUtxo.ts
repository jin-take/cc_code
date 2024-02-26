import axios from 'axios';
require('dotenv').config();
const env = process.env


interface UTXO {
    txid: string;
    vout: number;
    value: number;
}

async function getTransactionDetails(txid: string): Promise<any> {
    const url = `https://blockstream.info/testnet/api/tx/${txid}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw error;
    }
}

async function getUtxosWithWitness(address: string): Promise<any[]> {
    const utxoUrl = `https://blockstream.info/testnet/api/address/${address}/utxo`;

    try {
        const utxoResponse = await axios.get<UTXO[]>(utxoUrl);
        const utxos = utxoResponse.data;

        // 各UTXOに対してトランザクションの詳細を取得
        const transactions = await Promise.all(
            utxos.map(utxo => getTransactionDetails(utxo.txid))
        );

        // UTXOごとにwitnessUTXO情報を取得
        return utxos.map((utxo, index) => {
            const tx = transactions[index];
            const output = tx.vout[utxo.vout];
            return {
                ...utxo,
                witnessUTXO: {
                    value: output.value,
                    scriptPubKeyHex: output.scriptpubkey
                }
            };
        });
    } catch (error) {
        console.error('Error fetching UTXOs with witness:', error);
        return [];
    }
}

// 使用例
const address = String(env.ADDRESS_A);
getUtxosWithWitness(address)
    .then(utxos => console.log(utxos))
    .catch(error => console.error(error));
