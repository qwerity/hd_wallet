const {bitcoind} = require("../../common/utils");

(async() => {
  try {
    const balance = await bitcoind.getBalance()
    console.log("balance: ", balance)
    const address = await bitcoind.getNewAddress({label: 'ksh'})
    console.log("new address:", address)
    const txid = await bitcoind.sendToAddress(address, 0.0001)
    const tx = await bitcoind.getTransaction(txid)
    console.log("txid:", txid)
    console.log("\tfee:", tx.fee)
    console.log("\tblockhash:", tx.blockhash)
    console.log("\tconfirmed: ", tx.confirmations > 6, ", confirmations: ", tx.confirmations)

  } catch(e) {
    console.log(e)
  }
})()
