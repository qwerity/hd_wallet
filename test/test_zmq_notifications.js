const BitcoindZmq = require('bitcoind-zmq')
const bitcoin = require("bitcoinjs-lib");

const opts = { maxRetry: 20 }

const btcd = new BitcoindZmq({
  // topic: <zmq node>
  hashtx: 'tcp://127.0.0.1:3000',
  hashblock: 'tcp://127.0.0.1:3000',
  // rawtx: 'tcp://127.0.0.1:3001',
  rawblock: 'tcp://127.0.0.1:3001'
}, opts)

btcd.connect()

btcd.on('connect:*', (uri, type) => { console.log(`socket ${type} connected to ${uri}`) })
btcd.on('retry:hashtx', (type, attempt) => { console.log(`hashtx, connect retry attempt: ${attempt}`) })
btcd.on('error:*', (err, type) => { console.error(`${type} had error:`, err) })

btcd.on('hashblock', (hash) => {
  // hash <Buffer ... />
  console.log(hash.toString('hex'))
})

btcd.on('hashtx', (hash) => {
  // hash <Buffer ... />
  // console.log(hash)
})


const processTransaction = (mongoDb, blockHeight) =>
  async (tx) => {
    // const spentTxs = tx.ins
    //   .filter(i => script.classifyInput(i.script) === script.types.P2PKH)
    //   .map(i => ({ txid: i.hash.toString('hex').match(/.{2}/g).reverse().join(""), vout: i.index }))

    // for (let spentTx of spentTxs) {
    //   await mongoDb.collection('utxos').findOneAndDelete({ txid: spentTx.txid, vout: spentTx.vout });
    // }

    const utxos = tx
      .outs
      .map((out, index) => ({ value: out, index }))
      // .filter(out => script.classifyOutput(out.value.script) === script.types.P2PKH)
      .map((out, index) => ({
        address: bitcoin.script.decompile(out.value.script)[1].toString('hex'),
        txid: tx.getId(),
        vout: out.index,
        satoshis: out.value.value,
        height: 1, //blockHeight,
        coinbase: tx.isCoinbase()
      }));
    console.log("utxos:", utxos)

    // if (utxos.length > 0) {
    //   mongoDb.collection('utxos').insertMany(utxos);
    // }
  }

btcd.on('rawblock', async (rawBlock) => {
  const block = bitcoin.Block.fromHex(rawBlock);
  const blkPrevHash = block.prevHash.toString('hex');
  const blkMerkleRoot = block.merkleRoot.toString('hex');
  const txs = block.transactions.map(tx => ({
    ...tx,
    outs: tx.outs.map(o => ({ ...o, script: o.script.toString('hex') })),
    ins: tx.ins.map(i => ({ ...i, script: i.script.toString('hex'), hash: i.hash.toString('hex') })),
    id: tx.getId(),
    hash: tx.getHash().toString('hex')
  }));

  const height = 1//await getBlockchainHeight(mongoDb)() + 1;

  mongoDb=0
  block.transactions.forEach(processTransaction(mongoDb, height));

  const blockData = {
    ...block,
    merkleRoot: blkMerkleRoot,
    prevHash: blkPrevHash,
    transactions: txs,
    hash: block.getHash().toString('hex'),
    id: block.getId(),
    height
  };
  // console.log(blockData)
  //console.log(JSON.stringify(blockData, '\n', 2))
})

btcd.on('rawtx', (rawtxBuffer) => {
  // Message is a buffer. But we want it as a hex string.
  const rawTx = rawtxBuffer.toString('hex');

  // Use bitcoinjs-lib to decode the raw transaction.
  const tx = bitcoin.Transaction.fromHex(rawTx);

  console.log('txid: ', tx.getId());
  console.log(tx);

  tx.ins.forEach(input => {
    console.log(input)
  })
  tx.outs.forEach(output => {
    console.log(bitcoin.address.fromOutputScript(output.script))
  })
})

const processBlock = (hash) => {

}
