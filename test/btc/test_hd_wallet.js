const bitcoin = require('bitcoinjs-lib')
const {HDWallet} = require("../../btc/hd_wallet")
const {
  P2PKH,  // the standard(most used one) should use P2PKH purpose
  P2WPKH, // we need to use P2WPKH purpose for BIP84 (Native SegWit bech32 P2WPKH) address generation
  NestedP2WPKH,
  P2TR
} = require("../../common/hd_address_util").bipPurpose


/* Usage example
const exodus_mnemonic = 'topple library year under credit convince cereal cloud trophy tide shuffle online'
const wallet = new HDWallet()
wallet.generateRootNode({mnemonic: exodus_mnemonic})
const receiveAddresses = wallet.deriveAccountReceiveAddress({
    purpose: P2WPKH,
    accountIndex: 0,
    addressIndex: 2,
    isChange: true,
    isTestnet: false
})
console.log(receiveAddresses.derivedKey.index)

const accountsList = wallet.restore({
    accountsNumber: 2,
    receivedAddressesNumber: 3,
    mnemonic: exodus_mnemonic
})
console.log(accountsList.receive)
*/

// // const exodus_mnemonic = 'topple library year under credit convince cereal cloud trophy tide shuffle online'
const wallet = new HDWallet({network: bitcoin.networks.regtest})
wallet.generateRootNode({mnemonic: "write hand cheese hello mushroom gasp garlic gadget prison example type sheriff"})
const rootNode = wallet.getRootNode()

console.log(rootNode.toBase58())
console.log(rootNode.privateKey.toString('hex'))
wallet.generateRootNode()
const receiveAddresses = wallet.deriveAccountReceiveAddress({
  purpose: P2WPKH,
  accountIndex: 0,
  addressIndex: 2,
  isChange: true,
  isTestnet: true
})
console.log(receiveAddresses.derivedKey.index)
console.log(receiveAddresses.derivedKey.toWIF())
