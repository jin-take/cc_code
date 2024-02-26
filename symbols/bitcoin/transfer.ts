import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);
require('dotenv').config();
const env = process.env

interface UTXO {
    txid: string;
    vout: number;
    value: number;
    scriptPubKeyHex: string;
}


function main() {
    const utxos: UTXO[] = [
        {
            txid: String(env.TXID),
            vout: 0,
            value: 10168,
            scriptPubKeyHex: String(env.PRE_TX_HEX),
        }
    ];
    
    const recipientAddress: string = String(env.ADDRESS_B);
    const changeAddress: string = String(env.ADDRESS_A)
    const amountToSend = 5000; // 送金額（サトシ単位）
    const feeRate = 500; // 手数料率（サトシ/バイト）
    const m = 2; // マルチシグの「m」の値
    const n = 3; // マルチシグの「n」の値
    const privateKeys = [String(env.SECRET_KEY_A_1), String(env.SECRET_KEY_A_2)]; // マルチシグの秘密鍵
    
    const transaction = createMultisigTransaction(utxos, recipientAddress, changeAddress, amountToSend, feeRate, m, n, privateKeys)
        .then(transactionHex => console.log(transactionHex))
        .catch(error => console)
        
    console.log(transaction)
}


async function createMultisigTransaction(utxos: UTXO[], recipientAddress: string, changeAddress: string, amountToSend: number, feeRate: number, m: number, n: number, privateKeys: string[]): Promise<string> {
    const network = bitcoin.networks.testnet; 

    // PSBTの初期化
    const psbt = new bitcoin.Psbt({ network });

    // トランザクションの入力を追加
    utxos.forEach(utxo => {
        psbt.addInput({
            hash: utxo.txid,
            index: utxo.vout,
            witnessUtxo: {
                script: Buffer.from(utxo.scriptPubKeyHex, 'hex'),
                value: utxo.value,
            },
        });
    });

    // 送金先への出力を追加
    psbt.addOutput({
        address: recipientAddress,
        value: amountToSend, // サトシ単位
    });

    // 手数料の計算
    const totalUtxoValue = utxos.reduce((total, utxo) => total + utxo.value, 0);
    const changeValue = totalUtxoValue - amountToSend - feeRate * psbt.txInputs.length; // 手数料を引く

    // お釣りの出力を追加（お釣りがある場合）
    if (changeValue > 0) {
        psbt.addOutput({
            address: changeAddress,
            value: changeValue,
        });
    }

    // 秘密鍵からキーペアを生成
    const keyPairs = privateKeys.map((key) => ECPair.fromWIF(key, network));
    console.log(keyPairs)

    // トランザクションを署名
    utxos.forEach((_, index) => {
        keyPairs.forEach(keyPair => {
            psbt.signInput(index, keyPair);
        });
    });
    
    console.log(utxos)

    // トランザクションの最終化
    psbt.finalizeAllInputs();
    
    const rawTx = psbt.extractTransaction().toHex();
    console.log(rawTx)
    
    return rawTx;
}


main();

