import { FaucetClient } from '../src/clients/faucet-client';

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillWithRetries(client: FaucetClient, address: string, amount: number, retries: number = 5, delayMs: number = 10000): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      const faucetResponse = await client.fill(address, 0, amount);
      console.log(faucetResponse);
      const status = faucetResponse.status;
      console.log(status);
      return; // 成功したらリターン
    } catch (error) {
      console.log(`Attempt ${i + 1} failed: ${error.message}`);
      if (i < retries - 1) {
        await delay(delayMs);
      } else {
        throw error; // リトライの最後でも失敗したらエラーを投げる
      }
    }
  }
}

async function test(): Promise<void> {
  const client = new FaucetClient("https://faucet.v4testnet.dydx.exchange");
  const address = "dydx17p0uq84wmcl72t27vxmkap6rjh6undzxzae87k";
  await fillWithRetries(client, address, 20000);
}

test()
  .then(() => {})
  .catch((error) => {
    console.log(error.message);
  });
