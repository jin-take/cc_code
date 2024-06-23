import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { QueryClient, setupBankExtension, StargateClient} from '@cosmjs/stargate';
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { DelegationResponse } from "cosmjs-types/cosmos/staking/v1beta1/staking";

/**Explorerで確認
 * https://explorer.polypore.xyz/theta-testnet-001/account/cosmos1wx9u4vcmpp05805ulatj3vczhg7fkawqr0mvy5
 */

// RPC エンドポイントを設定
const rpcEndpoint = "https://rpc.sentry-01.theta-testnet.polypore.xyz"; // テストネット
// const rpcEndpoint = "https://cosmos-rpc.publicnode.com:443"

async function getBalance(address: string) {
  // QueryClient を作成
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = await StargateClient.connect(rpcEndpoint);
  const queryClient = QueryClient.withExtensions(tmClient, setupBankExtension);

  // 指定したアドレスの残高を取得
  const balance = await queryClient.bank.balance(address, "uatom"); 
  const balanceAtom = Number(balance.amount)/(10**6);
  
  // デリゲート数量を取得
  // Query delegations
  const validatorAddress = "cosmosvaloper1gpx52r9h3zeul45amvcy2pysgvcwddxrgx6cnv"
  const delegations = await client.getDelegation(address, validatorAddress);
  const delegateBalanceAtom = Number(delegations?.amount)/(10**6);

  const totalBalance = balanceAtom + delegateBalanceAtom

  
  // 結果を表示
  console.log(`Balance(atom) : ${balanceAtom}, atom`);
  console.log(`Delegating Balance(uatom): ${delegateBalanceAtom} atom`);
  console.log(`Total Balance(atom): ${totalBalance} atom`)
}

// テストするアドレス
// const testAddress = "cosmos1vz4f8prrh2vmtknzyh58yhqmgv43nlk0pdn6ef"; 
const testAddress = "cosmos1tqu8sjp6epsjuu3kfujy8q0l9jxuj04syu70us";

getBalance(testAddress);
