require('dotenv').config()
const BitcoinJsonRpc = require('../bitcoin-json-rpc').default;

const url = process.env.RPC_PROTOCOL+'://'+process.env.RPC_USERNAME
  +':'+process.env.RPC_PASSWORD
  +'@'+process.env.RPC_HOST
  +':'+process.env.RPC_REGTEST_PORT;

module.exports = {
  bitcoind: new BitcoinJsonRpc(url),
  bitcoindWallet: (walletName = null) => {
    let urlWithWallet = url
    if (!!walletName) {
      urlWithWallet += '/wallet/' + walletName
    }
    return new BitcoinJsonRpc(urlWithWallet)
  }
}
