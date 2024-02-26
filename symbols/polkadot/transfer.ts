import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

async function main() {
  // Polkadotノードへの接続を設定
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  // 送金元と送金先のアカウントを設定
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri('//Alice'); // 送金元アカウントの秘密鍵またはニーモニック
  const recipient = '送金先アドレス'; // 送金先のアドレス

  // 送金額を設定（例：1 DOTを10^10で表現）
  const amount = 1e10;

  // 送金トランザクションを作成して送信
  const transfer = api.tx.balances.transfer(recipient, amount);
  
  // トランザクションを署名して送信し、結果を待つ
  const hash = await transfer.signAndSend(sender);

  console.log(`Transfer is successful with hash ${hash.toHex()}`);
}

main().catch(console.error);
