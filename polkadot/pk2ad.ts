import { u8aToHex, hexToU8a } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';

// 公開鍵のHex文字列
const publicKeyHex = '0x028902708d90537bae5fce8406fecf5b24c38e69e883adeae3f3638fadd74313';

// Hexをバイト配列に変換
const publicKeyBytes = hexToU8a(publicKeyHex);

// アドレスをエンコード
const address = encodeAddress(publicKeyBytes);

console.log(address);