const bitcoin = require('bitcoinjs-lib')
const HDWallet = require("../../hd_wallet")
const {P2WPKH} = require("../../common/hd_address_util").bipPurpose
const {bitcoind, bitcoindWallet} = require("../../common/utils")

bitcoind.getBalance().then(balance => console.log(balance))
// for (let i = 0; i < 10000; i++) {
//   bitcoind.getNewAddress().then(address => console.log(address)).then(() => {
//     bitcoind.getBalance().then(balance => console.log(balance))
//   })
//   setTimeout(() => {  console.log("World!"); }, 2000);
// }

// const unfundedTx = bitcoind.createRawTransaction([], {['tb1qg5emmgd72nkl3us498sm5cqfmdf7puhdwcjfzw']: '0.005'}).then(value => {
//   console.log(value)
// })

// const exodus_mnemonic = 'topple library year under credit convince cereal cloud trophy tide shuffle online'
// const wallet = new HDWallet.HDWallet()
// wallet.generateRootNode({mnemonic: exodus_mnemonic})
// const receiveAddresses = wallet.deriveAccountReceiveAddress({
//   purpose: P2WPKH,
//   accountIndex: 0,
//   addressIndex: 0,
//   isChange: false,
//   isTestnet: true
// })
// console.log(receiveAddresses.address)
//
// let tx = new bitcoin.TransactionBuilder(P2WPKH.network.testnet)
// let keyPair1 = receiveAddresses.derivedKey
// // let keyPair2 = generateAddressFromSHA256Hash('B*tc0in')
// const satoshi = 100000000
// let amountWeHave = 0.1 * satoshi
// let amountToKeep = 0.9 * satoshi
// let transactionFee = 1000 // .00001 BTC
// let amountToSend = amountWeHave - amountToKeep - transactionFee
// tx.addInput('tb1qrf6w5w2pkppyrvfatxxaytvmz394k5r3mwttqs', 0)
// tx.addOutput(receiveAddresses.address, amountToSend)
// tx.addOutput(receiveAddresses.address, amountToKeep)
//
//
// const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet })
// psbt.addInput({
//   // if hash is string, txid, if hash is Buffer, is reversed compared to txid
//   // output point on electrum for hash and index
//   hash: '6c78ffa6471d10c7f49ec8a3a99bf2fa6f320f8980030caadb34b3546ca5444e',
//   index: 24,
//
//   // non-segwit inputs now require passing the whole previous tx as Buffer
//   nonWitnessUtxo: Buffer.from(
//     '0200000001f9f34e95b9d5c8abcd20fc5bd4a825d1517be62f0f775e5f36da944d9' +
//     '452e550000000006b483045022100c86e9a111afc90f64b4904bd609e9eaed80d48' +
//     'ca17c162b1aca0a788ac3526f002207bb79b60d4fc6526329bf18a77135dc566020' +
//     '9e761da46e1c2f1152ec013215801210211755115eabf846720f5cb18f248666fec' +
//     '631e5e1e66009ce3710ceea5b1ad13ffffffff01' +
//     // value in satoshis (Int64LE) = 0x015f90 = 90000
//     '905f010000000000' +
//     // scriptPubkey length
//     '19' +
//     // scriptPubkey
//     '76a9148bbc95d2709c71607c60ee3f097c1217482f518d88ac' +
//     // locktime
//     '00000000',
//     'hex',
//   )
// });
//
// psbt.addOutput({
//   address: 'mxwzo8HoTf9pz9daguCCscyUkWvSmmpNzS',
//   value: 80000,
// });
// psbt.signInput(0, alice);
// psbt.validateSignaturesOfInput(0);
// psbt.finalizeAllInputs();
//
// console.log('our beautiful transaction: ', tx_hex)
