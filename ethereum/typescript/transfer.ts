import { ethers } from "ethers";

// 送信者の秘密鍵と受信者のアドレスを設定
const senderPrivateKey = 'b9554a0f8f3ae62eaf05abbc109b75efa019cb4b132ed0dfe7ab2b222ae9e71c';
const recipientAddress = '0xc20e03E025C3F40772f9bDc0F9BeD896fB5E3dCA';

// SepoliaテストネットのプロバイダーURL
const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

async function sendEth() {
    // プロバイダーとウォレットを初期化
    const wallet = new ethers.Wallet(senderPrivateKey, sepoliaProvider);

    // トランザクションの作成（送金先と送金額）
    const tx = {
        to: recipientAddress,
        value: ethers.parseEther("0.05") 
    };

    // トランザクションを送信
    const txResponse = await wallet.sendTransaction(tx);
    console.log('トランザクションハッシュ:', txResponse.hash);

    // トランザクションの確認が生成できたことを確認
    const receipt = await txResponse.wait();
    console.log('成功したトランザクションの詳細:', receipt);
    
}

sendEth();
