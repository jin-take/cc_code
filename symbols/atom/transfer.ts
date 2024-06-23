import axios from 'axios';
import { Secp256k1, Secp256k1Signature, Sha256 } from '@cosmjs/crypto';
import { fromBase64, toBase64 } from '@cosmjs/encoding';
import { Uint53 } from '@cosmjs/math';
import { assertIsDeliverTxSuccess } from '@cosmjs/stargate';
import { encodeSecp256k1Pubkey, makeSignDoc, makeStdTx, serializeSignDoc, StdFee, StdSignature } from '@cosmjs/amino';

// 必要な変数を設定
const privateKeyBase64 = 'your private key in base64';
const publicKeyBase64 = 'cosmos1tqu8sjp6epsjuu3kfujy8q0l9jxuj04syu70us';
const senderAddress = 'cosmos1senderaddresshere';
const networkUrl = 'https://api.testnet.cosmos.network';

// 送金の実行
const sendTokens = async (senderAddress: string, recipientAddress: string, amount: string, memo: string, tags: object) => {
  // 送金情報を取得
  const { data } = await axios.get(`${networkUrl}/auth/accounts/${senderAddress}`);
  const account = data.result.value;

  const sequence = account.sequence;
  const accountNumber = account.account_number;

  // トランザクションの作成
  const sendMsg = {
    type: 'cosmos-sdk/MsgSend',
    value: {
      from_address: senderAddress,
      to_address: recipientAddress,
      amount: [{ denom: 'uatom', amount }],
    },
  };

  const fee: StdFee = {
    amount: [{ denom: 'uatom', amount: '5000' }],
    gas: '200000',
  };

  const signDoc = makeSignDoc(
    [sendMsg],
    fee,
    'cosmoshub-4',
    memo,
    accountNumber,
    sequence
  );

  const privateKey = fromBase64(privateKeyBase64);
  const publicKey = fromBase64(publicKeyBase64);
  const signBytes = serializeSignDoc(signDoc);
  const hashedMessage = new Sha256(signBytes).digest();
  const signature = await Secp256k1.createSignature(hashedMessage, privateKey);
  const stdSignature: StdSignature = {
    pub_key: encodeSecp256k1Pubkey(publicKey),
    signature: toBase64(signature.toFixedLength()),
  };

  const signedTx = makeStdTx(signDoc, stdSignature);

  // トランザクションの送信
  const { data: broadcastResult } = await axios.post(`${networkUrl}/txs`, {
    tx: signedTx,
    mode: 'block',
  });

  assertIsDeliverTxSuccess(broadcastResult);

  console.log('Transaction hash:', broadcastResult.txhash);
};

// 送金の実行
const main = async () => {
  const recipientAddress = 'cosmos1l550x4yh76hxh37lf5ag8u879dphknydgk8g0t';
  const amount = '1000000'; // 1 ATOM (1 ATOM = 1000000 uatom)
  const memo = 'Test transaction with tags';
  const tags = {
    key: 'example_key',
    value: 'example_value'
  };

  await sendTokens(senderAddress, recipientAddress, amount, memo, tags);
};

main().catch(console.error);
