const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')
const {
    P2PKH,  // the standard(most used one) should use P2PKH purpose
    P2WPKH, // we need to use P2WPKH purpose for BIP84 (Native SegWit bech32 P2WPKH) address generation
    NestedP2WPKH,
    P2TR
} = require("../common/hd_address_util").bipPurpose

//https://github.com/iancoleman/bip39/blob/c4f0c2908faab1452937e50a7d3a400fed42a0a8/src/js/bitcoinjs-extensions.js
class HDWallet {
    constructor({
      network,
      mnemonicStrength = 128
    }) {
        this.mnemonicStrength = mnemonicStrength
        this.mnemonic = null
        this.seedPassphrase = null
        this.rootNode = null
        this.network = network
    }

    generateRootNode({mnemonic, seedPassphrase} = {}) {
        if (! mnemonic) {
            this.mnemonic = bip39.generateMnemonic(this.mnemonicStrength)
        } else {
            this.mnemonic = mnemonic
        }

        this.seedPassphrase = seedPassphrase
        const seed = bip39.mnemonicToSeedSync(this.mnemonic, this.seedPassphrase)
        this.rootNode = bitcoin.bip32.fromSeed(seed, this.network)
    }

    getRootNode() {
        return this.rootNode
    }

    getSecret() {
        return {
            mnemonic: this.mnemonic,
            passphrase: this.seedPassphrase
        }
    }

    restore({
        accountsNumber = 2,
        receivedAddressesNumber = 1,
        changeAddressesNumber = 0,
        mnemonic,
        seedPassphrase,
        purpose = P2WPKH
    }) {
        if (! bip39.validateMnemonic(mnemonic)) {
            throw "Not valid mnemonic"
        }
        this.mnemonic = mnemonic
        this.seedPassphrase = seedPassphrase
        const seed = bip39.mnemonicToSeedSync(this.mnemonic, this.seedPassphrase)
        this.rootNode = bitcoin.bip32.fromSeed(seed)

        let deriveParams = {
            purpose,
            accountIndex: 0,
            addressIndex: 0,
            isTestnet: false,
            isChange: false
        }
        let accountsList = {
            receive: [],
            change: [],
        }
        for (let account = 0; account < accountsNumber; account++) {
            deriveParams.accountIndex = account
            for (let n = 0; n < receivedAddressesNumber; n++) {
                deriveParams.addressIndex = n
                deriveParams.isChange = false
                accountsList.receive.push(this.deriveAccountAddress(deriveParams))
            }
            for (let n = 0; n < changeAddressesNumber; n++) {
                deriveParams.addressIndex = n
                deriveParams.isChange = true
                accountsList.change.push(this.deriveAccountAddress(deriveParams))
            }
        }
        return accountsList
    }

    deriveAccountAddress({
       purpose,
       accountIndex = 0,
       addressIndex = 0,
       isTestnet = false,
       isChange = false
    }) {
        if (! this.rootNode) {
            this.generateRootNode()
        }

        // m / purpose' / coin_type' / account' / change / address_index
        const derivedKey = this.rootNode
          .deriveHardened(purpose.bip)             // purpose
          .deriveHardened(isTestnet ? 1 : 0) // 0 - is BTC coin type
          .deriveHardened(accountIndex)            // account index
          .derive(isChange ? 1 : 0)          // 0 - external(receive), 1 - internal(change) address
          .derive(addressIndex);                   // address_index

        const network = (this.network === null) ? (isTestnet ? purpose.network.regtest : purpose.network.main) : this.network

        return {
            derivedKey,
            address: purpose.addressGenerator(derivedKey, network),
            // addresses: calculateAddresses(derivedKey, network)
        }
    }

    deriveAccountReceiveAddress(params) {
        params.isChange = false;
        return this.deriveAccountAddress(params)
    }

    deriveAccountChangeAddress(params) {
        params.isChange = true;
        return this.deriveAccountAddress(params)
    }

    backup(){
        return {
            mnemonic: this.mnemonic,
            seedPassphrase: this.seedPassphrase
        }
    }
}

module.exports = {
    HDWallet: HDWallet
}
