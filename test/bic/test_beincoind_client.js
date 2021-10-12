const {beincoind} = require("../../common/utils");

(async() => {
  try {
    console.log("balance: ", await beincoind.getBalance())
    console.log("unconfirmedbalance: ", await beincoind.getUnconfirmedBalance())

    const address = await beincoind.getNewAddress('ksh')
    console.log("new address:", address)

    const txid = await beincoind.sendToAddress(address, 0.0001)
    // with txid we can check the transaction status by confirmations number
    const tx = await beincoind.getTransaction(txid)
    console.log("txid:", txid)
    console.log("\tfee:", tx.fee)
    console.log("\tblockhash:", tx.blockhash)
    console.log("\tconfirmed: ", tx.confirmations > 21, ", confirmations: ", tx.confirmations)

  } catch(e) {
    console.log(e)
  }
})()
