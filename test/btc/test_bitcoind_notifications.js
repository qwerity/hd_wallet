const BitcoindZmq = require('bitcoind-zmq');
const bitcoin = require("bitcoinjs-lib");
const {bitcoind} = require("../../common/utils");

const btcd = new BitcoindZmq({
  hashblock: 'tcp://127.0.0.1:3000',
  hashtx:    'tcp://127.0.0.1:3000',
  // rawblock:  'tcp://127.0.0.1:3001',
  // rawtx:     'tcp://127.0.0.1:3001'
});

btcd.on('connect:*', (uri, type) => { console.log(`socket ${type} connected to ${uri}`) })
btcd.on('retry:*', (type, attempt) => { console.log(`type: ${type}, retry attempt: ${attempt}`) })
btcd.on('error:*', (err, type) => { console.error(`${type} had error:`, err) })
btcd.on('close:*', (err, type) => { console.log(`close ${type}`, err || '') })

btcd.connect()

btcd.on('hashblock', async (hash) => {
  const block = await bitcoind.getBlock({
    blockhash: hash.toString("hex"),
    verbosity: 2     // returns an Object with information about block <hash> and information about each transaction.
  })
  console.log('block.confirmations:', block.confirmations)

  let new_unspend_transactions = []
  block.tx.forEach(tx => {
    tx.vout.forEach(out => {
      if (out.value > 0) {
        const address = out.scriptPubKey.address
        const valueInBTC = out.value
        new_unspend_transactions.push({address, valueInBTC})
      }
    })
  })
  console.log(new_unspend_transactions)
})

btcd.on('hashtx', async (hash) => {
  const txid = hash.toString('hex')
  console.log('hashtx:', txid)

  const tx = await bitcoind.getRawTransaction({
    txid: hash.toString('hex'),
    verbose: true
  })
  // console.log(tx)

  let new_unspend_transactions = []
  tx.vout.forEach(out => {
    if (out.value > 0) {
      const address = out.scriptPubKey.address
      const valueInBTC = out.value
      new_unspend_transactions.push({address, valueInBTC})
    }
  })
  console.log(new_unspend_transactions)
})

btcd.on('rawblock', async (rawBlock) => {
  const block = bitcoin.Block.fromHex(rawBlock);
  console.log("new block")
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
