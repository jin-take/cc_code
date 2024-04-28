import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { QueryClient, setupBankExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

/**Explorerで確認
 * https://explorer.polypore.xyz/theta-testnet-001/account/cosmos1wx9u4vcmpp05805ulatj3vczhg7fkawqr0mvy5
 */

// RPC エンドポイントを設定
const rpcEndpoint = "https://rpc.sentry-01.theta-testnet.polypore.xyz"; // このエンドポイントは実際のものに置き換えてください。

async function getBalance(address: string) {
  // QueryClient を作成
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const queryClient = QueryClient.withExtensions(tmClient, setupBankExtension);

  // 指定したアドレスの残高を取得
  const balance = await queryClient.bank.balance(address, "uatom"); 
  
  // 結果を表示
  console.log(`Balance(uatom): ${balance.amount} ${balance.denom}`);
  console.log(`Balance(atom) : ${Number(balance.amount)/(10**6)} atom`);
}

// テストするアドレス
const testAddress = "cosmos1wx9u4vcmpp05805ulatj3vczhg7fkawqr0mvy5"; 

getBalance(testAddress);
