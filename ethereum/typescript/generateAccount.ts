import { ethers } from 'ethers';

async function main() {
    for (var i = 0;  i<2; i++) {
        console.log(`<アカウント${i+1}>`)
        const wallet = ethers.Wallet.createRandom();
        console.log(`ADDRESS_${i+1} = "${wallet.address}"`);      // イーサリアムの場合は、ウォレットアドレスと公開鍵が同一
        console.log(`PUBLIC_KEY_${i+1} = "${wallet.address}"`);   // イーサリアムの場合は、ウォレットアドレスと公開鍵が同一
        
        if (i == 0) {
            console.log(`PRIVATE_KEY_${i+1} = "${wallet.privateKey}"`);               // 秘密鍵
            if (wallet.mnemonic) {
                console.log(`MNEMONIC_${i+1} = "${wallet.mnemonic.phrase}"`);         // ニーモニック
            }
        } 
    }
}

main();


// import { ethers } from 'ethers';

// function generateEthereumAddress() {
//   const wallet = ethers.Wallet.createRandom();
//   return {
//     address: wallet.address,
//     privateKey: wallet.privateKey
//   };
// }

// const newAddress = generateEthereumAddress();
// console.log(`アドレス（公開鍵）: ${newAddress.address}`);
// console.log(`秘密鍵: ${newAddress.privateKey}`);