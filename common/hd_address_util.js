const networks = require("./btc_networks").networks
const bitcoin = require('bitcoinjs-lib')
const ecurve = require('ecurve')
const secp256k1 = ecurve.getCurveByName('secp256k1')
const schnorr = require('bip-schnorr')
const bech32 = require('bech32').bech32
const bech32m = require('bech32').bech32m

function getP2PKHAddress(keyPair, network) {
  return bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: network }).address
}

function getP2WPKHAddress(keyPair, network) {
  return bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network }).address
}

function getNestedP2WPKHAddress(keyPair, network) {
  const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network })
  return bitcoin.payments.p2sh({ redeem: p2wpkh }).address
}

function getP2TRAddress(keyPair, network) {
  const pubKey = ecurve.Point.decodeFrom(secp256k1, keyPair.publicKey)
  const taprootPubkey = schnorr.taproot.taprootConstruct(pubKey)
  const words = bech32.toWords(taprootPubkey)
  words.unshift(1)
  return bech32m.encode(network.bech32, words)
}

module.exports = {
  bipPurpose: {
    P2PKH: {
      label: 'BIP44 (Legacy wallets, multi coin wallets)',
      bip: 44,
      addressGenerator: getP2PKHAddress,
      network: {
        main: networks.legacy_BIP44,
        testnet: networks.Regtest_legacy_BIP44,
        regtest: networks.Testnet_legacy_BIP44
      }
    },
    NestedP2WPKH: {
      label: 'BIP49 (SegWit P2SH-P2WPKH, nested)',
      bip: 49,
      addressGenerator: getNestedP2WPKHAddress,
      network: {
        main: networks.SegWit_BIP49,
        testnet: networks.Regtest_SegWit_BIP49,
        regtest: networks.Testnet_SegWit_BIP49
      }
    },
    P2WPKH: {
      label: 'BIP84 (Native SegWit bech32 P2WPKH)',
      bip: 84,
      addressGenerator: getP2WPKHAddress,
      network: {
        main: networks.Native_SegWit_BIP84,
        testnet: networks.Testnet_Native_SegWit_BIP84,
        regtest: networks.Regtest_Native_SegWit_BIP84
      }
    },
    P2TR: {
      label: 'BIP341 (Native SegWit v1 bech32 P2TR)',
      bip: 341,
      addressGenerator: getP2TRAddress,
      network: { //TODO(ksh): should be checked
        main: networks.legacy_BIP44,
        testnet: networks.Regtest_legacy_BIP44,
        regtest: networks.Testnet_legacy_BIP44
      }
    },
  },

  customToWIF: function(keyPair) {
    return keyPair.toWIF()
  },

  calculateAddresses: function(keyPair, network) {
    const address = {}
    address.P2PKH = getP2PKHAddress(keyPair, network)
    if (network.bech32) {
      address.NestedP2WPKH = getNestedP2WPKHAddress(keyPair, network)
      address.P2WPKH = getP2WPKHAddress(keyPair, network)
      address.P2TR = getP2TRAddress(keyPair, network)
    }
    return address
  },
}
