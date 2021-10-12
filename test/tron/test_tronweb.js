const TronWeb = require('tronweb');

const TRON_API_KEY = 'f0b46b85-3d1a-481e-9b79-e186403b26ee'
const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';
const privateKey = 'E3B22B258D36D7B5F0C2A9B31844983822D4E98F8B3B625637AD9DE6FFE273C8';
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

(async() => {
  try {
    // const account = await tronWeb.createAccount()
    // {
    //   privateKey: 'E3B22B258D36D7B5F0C2A9B31844983822D4E98F8B3B625637AD9DE6FFE273C8',
    //   publicKey: '049D71C64617FD32EADC348E39F244BBC81063EA8F1E0273C1C1F853277A6C79B9A98CC1B8F77819F3B56318BDAC054487A0848C0E02AE5BB4F14904D39669BBDA',
    //   address: {
    //     base58: 'TCoi5mdSxd7NuefVeZJncPpnD9z48evJ2X',
    //       hex: '411F1C7E576046D57ACFBC627728C4FD6C52781867'
    //   }
    // }
    console.log(await tronWeb.isAddress('TCoi5mdSxd7NuefVeZJncPpnD9z48evJ2X'))
    const accountInfo = await tronWeb.trx.getAccount('TCoi5mdSxd7NuefVeZJncPpnD9z48evJ2X')
    console.log(accountInfo)
  } catch(e) {
    console.log(e)
  }
})()
