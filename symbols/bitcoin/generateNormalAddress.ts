import * as crypto from 'crypto';
import { ECPairFactory } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
const ECPair = ECPairFactory(ecc);
import * as bitcoinjs from 'bitcoinjs-lib';

// 秘密鍵の生成
const privateKey = crypto.randomBytes(32);
console.log(privateKey)
console.log(privateKey.toString('hex'))

// 公開鍵の生成
const keyPair = ECPair.fromPrivateKey(privateKey);
const publicKey = keyPair.publicKey;

console.log(publicKey)
console.log(publicKey.toString('hex'))

// P2PKHアドレスの生成
const { address: p2pkhAddress } = bitcoinjs.payments.p2pkh({ pubkey: publicKey });

// P2SHアドレスの生成（SegWit含む）
const { address: p2shAddress } = bitcoinjs.payments.p2sh({
  redeem: bitcoinjs.payments.p2wpkh({ pubkey: publicKey }),
});

console.log(`P2PKH Address: ${p2pkhAddress}`);
console.log(`P2SH Address: ${p2shAddress}`);
