import {
  BECH32_PREFIX,
  LocalWallet,
} from '@dydxprotocol/v4-client-js';
  

async function generateAddress() {
  const mnemonic = 'much siege vast width pupil ketchup reform social liar remind actor exit ';
  const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);  
  console.log(wallet)
}

generateAddress()