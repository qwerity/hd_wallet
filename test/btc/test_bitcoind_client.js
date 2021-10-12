const {bitcoind, beincoind} = require("../../common/utils");

(async() => {
  try {
    console.log("balance: ", await beincoind.getBalance())
    console.log("unconfirmedbalance: ", await beincoind.getUnconfirmedBalance())

    const address = await bitcoind.getNewAddress({label: 'ksh'})
    console.log("new address:", address)

    const txid = await bitcoind.sendToAddress(address, 0.0001)
    // with txid we can check the transaction status by confirmations number
    const tx = await bitcoind.getTransaction(txid)
    console.log("txid:", txid)
    console.log("\tfee:", tx.fee)
    console.log("\tblockhash:", tx.blockhash)
    console.log("\tconfirmed: ", tx.confirmations > 6, ", confirmations: ", tx.confirmations)

  } catch(e) {
    console.log(e)
  }
})()
