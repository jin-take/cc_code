import {
    makeRandomPrivKey,
    privateKeyToString,
    getAddressFromPrivateKey,
    TransactionVersion,
    getPublicKey,
    StacksPrivateKey,
    StacksPublicKey,
} from "@stacks/transactions";


const privateKey: StacksPrivateKey = makeRandomPrivKey();   // 秘密鍵の作成
const publicKey: StacksPublicKey = getPublicKey(privateKey);    // 秘密鍵から公開鍵の作成
const networkType: TransactionVersion = TransactionVersion.Testnet

// テストネットで秘密鍵からウォレットアドレスを作成
const stacksAddress: string = getAddressFromPrivateKey(
    privateKeyToString(privateKey),
    networkType     // メインネットで作成する場合は、ここは記述しなくて良い
);

console.log(stacksAddress);


