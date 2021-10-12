const {beincoind} = require("../../common/utils");

(async() => {
  try {
    const balance = await beincoind.getBalance()
    console.log(balance)
    const address = await beincoind.getNewAddress()
    console.log(address)
  } catch(e) {
    console.log(e)
  }
})()
