require('dotenv').config()
const Client = require("bitcoin-core");

let rpcConfig = {
  host: process.env.BTC_RPC_HOST,
  port: process.env.BTC_RPC_REGTEST_PORT,
  username: process.env.BTC_RPC_USERNAME,
  password: process.env.BTC_RPC_PASSWORD,
  version: process.env.BTC_VERSION,
}

module.exports = {
  bitcoind: new Client(rpcConfig)
}
