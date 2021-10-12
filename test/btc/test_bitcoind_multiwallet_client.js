const Client = require("bitcoin-core");

let rpcConfig = {
  host: "localhost",
  port: 18443,
  username: "test",
  password: "test",
  headers: false,
  version: "0.22.0",
}

rpcConfig.wallet = "ksh"
const kshWallet = new Client(rpcConfig)
const kshWalletPassphrase = "ksh"

rpcConfig.wallet = "test_wallet"
const testWallet = new Client(rpcConfig)

const testAddress = "bcrt1qmd49w0qzrqaduk0q8x4va2cj8h87u0l3vwwh62";
const kshAddress = "bcrt1qu86fwn59w7laz6glsyjadxrlmrg8rafjnl5kfh";

(async() => {
  try {
    const balance = await testWallet.getBalance()
    if (balance > 10) {
      const txid = await testWallet.sendToAddress(kshAddress, 0.1)
      console.log("txid:", txid)
    }

    await kshWallet.walletPassphrase({
      passphrase: kshWalletPassphrase,
      timeout: 60
    })

    const txid = await kshWallet.sendToAddress(testAddress, 0.1)
    console.log("txid:", txid)

    {
      const address = await kshWallet.getNewAddress({label: 'ksh'})
      console.log("new address:", address)
      const txid = await testWallet.sendToAddress(address, 0.2)
      console.log("txid:", txid)
    }
  } catch(e) {
    console.log(e)
  }
})()
