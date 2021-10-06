module.exports = {
  networks: {
    Regtest_legacy_BIP44: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bcrt',
      bip32: {public: 0x043587cf, private: 0x04358394},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Regtest_SegWit_BIP49: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bcrt',
      bip32: {public: 0x044a5262, private: 0x044a4e28},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Regtest_Native_SegWit_BIP84: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bcrt',
      bip32: {public: 0x045f1cf6, private: 0x045f18bc},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Signet_legacy_BIP44: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x043587cf, private: 0x04358394},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Signet_SegWit_BIP49: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x044a5262, private: 0x044a4e28},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Signet_Native_SegWit_BIP84: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x045f1cf6, private: 0x045f18bc},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Testnet_legacy_BIP44: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x043587cf, private: 0x04358394},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Testnet_SegWit_BIP49: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x044a5262, private: 0x044a4e28},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    Testnet_Native_SegWit_BIP84: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {public: 0x045f1cf6, private: 0x045f18bc},
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239,
      bip44: 0x01
    },
    legacy_BIP44: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {public: 0x0488b21e, private: 0x0488ade4},
      pubKeyHash: 0,
      scriptHash: 5,
      wif: 128,
      bip44: 0x00
    },
    SegWit_BIP49: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {public: 0x049d7cb2, private: 0x049d7878},
      pubKeyHash: 0,
      scriptHash: 5,
      wif: 128,
      bip44: 0x00
    },
    Native_SegWit_BIP84: {
      messagePrefix: '\u0018Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {public: 0x04b24746, private: 0x04b2430c},
      pubKeyHash: 0,
      scriptHash: 5,
      wif: 128,
      bip44: 0x00
    },
  },
}
