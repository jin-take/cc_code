import * as bip39 from 'bip39';
import { Slip10, Slip10Curve, Bip39, EnglishMnemonic, HdPath } from '@cosmjs/crypto';
import { stringToPath } from '@cosmjs/crypto';

const mnemonic = 'toward behave next lumber follow toddler fox veteran minimum song adapt hub find deliver clap humor survey ready can match post inject unable give';

const getPrivateKeyFromMnemonic = async (mnemonic: string): Promise<Uint8Array> => {
  const mnemonicChecked = new EnglishMnemonic(mnemonic);
  const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
  const hdPath: HdPath = stringToPath("m/44'/118'/0'/0/0"); // CosmosのHDパス
  const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);
  return privkey;
};

const main = async () => {
  const privateKey = await getPrivateKeyFromMnemonic(mnemonic);
  console.log('Private Key:', Buffer.from(privateKey).toString('hex'));
};

main().catch(console.error);
