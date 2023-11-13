import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);
require('dotenv').config();
const env = process.env

// トランザクションデータの例
const txData = {
    txId: String(env.TXID),
    outputIndex: 0,
    amount: Number(env.INPUT_AMOUNT),
    previousOutputHex: String(env.PRE_TX_HEX)
};

// トランザクションの作成
function createAndSignMultisigTransaction(secret1: string, secret2: string, txData: any): string {
    const network = bitcoin.networks.testnet;

    // 秘密鍵からキーペアを生成
    const keyPair1 = ECPair.fromPrivateKey(Buffer.from(String(env.SECRET_KEY_A_1), 'hex'), { network });
    const keyPair2 = ECPair.fromPrivateKey(Buffer.from(String(env.SECRET_KEY_A_2), 'hex'), { network });

    // PSBTの初期化
    const psbt = new bitcoin.Psbt({ network });

    // トランザクション入力の追加
    psbt.addInput({
        hash: txData.txId,
        index: txData.outputIndex,
        // 前のトランザクションのアウトプットデータ
        // ノンウィットネスUTXOか、witnessUTXOのどちらかを含める必要があります
        nonWitnessUtxo: Buffer.from(txData.previousOutputHex, 'hex')
    });

    // トランザクション出力の追加
    psbt.addOutput({
        address: String(env.ADDRESS_B),
        value: txData.amount,
    });

    // トランザクション署名
    psbt.signInput(0, keyPair1);
    psbt.signInput(0, keyPair2);

    // トランザクションの最終化
    psbt.finalizeAllInputs();

    // 完成したトランザクションをHEX形式で取得
    return psbt.extractTransaction().toHex();
}


function main() {
    const secret1 = String(env.SECRET_KEY_A_1);
    const secret2 = String(env.SECRET_KEY_A_2);;
    
    const rawTransaction = createAndSignMultisigTransaction(secret1, secret2, txData);
    console.log(rawTransaction);
}

main();
