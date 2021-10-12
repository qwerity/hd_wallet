require('dotenv').config()
const Client = require("bitcoin-core");

const btcRPCConfig = {
  host: process.env.BTC_RPC_HOST,
  port: process.env.BTC_RPC_TESTNET_PORT,
  username: process.env.BTC_RPC_USERNAME,
  password: process.env.BTC_RPC_PASSWORD,
  version: process.env.BTC_VERSION,
}

const bicRPCConfig = {
  host: process.env.BIC_RPC_HOST,
  port: process.env.BIC_RPC_PORT,
  username: process.env.BIC_RPC_USERNAME,
  password: process.env.BIC_RPC_PASSWORD,
  version: process.env.BIC_VERSION,
}

module.exports = {
  bitcoind: new Client(btcRPCConfig),
  beincoind: new Client(bicRPCConfig)
}
