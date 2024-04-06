import { Bip39, Random, Secp256k1 } from "@cosmjs/crypto";
import { Secp256k1HdWallet, makeCosmoshubPath } from "@cosmjs/launchpad";
import { encodeSecp256k1Pubkey, pubkeyToAddress } from "@cosmjs/amino";

// テストネット設定 (例: Cosmos Hub テストネット)
const prefix = "cosmos";

async function generateTestnetAddress() {
  // 自動生成されたニーモニック
  const entropy = Random.getBytes(32); // 256ビットのエントロピー
  const mnemonic = Bip39.encode(entropy).toString();
  console.log(`Generated mnemonic: ${mnemonic}`);

  // HDウォレットを生成
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: prefix,
    hdPaths: [makeCosmoshubPath(0)],
  });

  // 公開鍵と秘密鍵を取得
  const [{ pubkey, address }] = await wallet.getAccounts();

  // 公開鍵からアドレスを生成
  const cosmosAddress = pubkeyToAddress(encodeSecp256k1Pubkey(pubkey), prefix);

  console.log(`Generated Cosmos address: ${cosmosAddress}`);
  console.log(`Generated Cosmos Public Key: ${pubkey}`)
  console.log(`Generated Cosmos Address: ${address}`)
}

generateTestnetAddress().catch(console.error);
