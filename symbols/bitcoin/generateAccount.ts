import * as bitcoin from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);
import { randomBytes } from 'crypto';

const network = bitcoin.networks.testnet;

// 2つの秘密鍵の生成(64桁)
const secretKey1 = generatePrivateKey();
const secretKey2 = generatePrivateKey();

console.log("シークレットキー1:  ", secretKey1);
console.log("シークレットキー2:  ", secretKey2);


// 秘密鍵の生成
function generatePrivateKey(): string {
    const privateKey = randomBytes(32); // 32バイトのランダムデータを生成
    return privateKey.toString('hex'); // 16進数の文字列に変換
}

// 秘密鍵からECPairを生成
const keyPair1 = ECPair.fromPrivateKey(Buffer.from(secretKey1, 'hex'));
const keyPair2 = ECPair.fromPrivateKey(Buffer.from(secretKey2, 'hex'));

// マルチシグリディムスクリプトの生成
const pubkeys = [keyPair1.publicKey, keyPair2.publicKey]
const redeemScript = bitcoin.payments.p2ms({
    m: 2, // 2-of-2マルチシグ
    pubkeys,
    network: bitcoin.networks.testnet,
}).output!;
console.log("リディムスクリプト: ", redeemScript.toString('hex'));

// セグウィットアドレスの生成
const scriptPubKey = bitcoin.payments.p2wsh({
    redeem: { output: redeemScript, network: bitcoin.networks.bitcoin },
    network: bitcoin.networks.bitcoin,
}).address!;

console.log("セグウィットアドレス: ", scriptPubKey)


// 2つの公開鍵を使用してマルチシグアドレスを生成
const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network });
const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network });
const p2sh = bitcoin.payments.p2sh({ redeem: p2wsh, network });

console.log("マルチシグアドレス: ", p2sh.address);
