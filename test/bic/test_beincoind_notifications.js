const BitcoindZmq = require('bitcoind-zmq');
const bitcoin = require("bitcoinjs-lib");
const {beincoind} = require("../../common/utils");

const bicd = new BitcoindZmq({
  hashblock: 'tcp://127.0.0.1:3010',
  hashtx:    'tcp://127.0.0.1:3010',
  // rawblock:  'tcp://127.0.0.1:3001',
  // rawtx:     'tcp://127.0.0.1:3001'
});

bicd.on('connect:*', (uri, type) => { console.log(`socket ${type} connected to ${uri}`) })
bicd.on('retry:*', (type, attempt) => { console.log(`type: ${type}, retry attempt: ${attempt}`) })
bicd.on('error:*', (err, type) => { console.error(`${type} had error:`, err) })
bicd.on('close:*', (err, type) => { console.log(`close ${type}`, err || '') })

bicd.connect()

bicd.on('hashblock', async (hash) => {
  console.log('hashblock')
  const blockhash = hash.toString("hex")
  const verbosity = true
  const block = await beincoind.getBlock(blockhash, verbosity)
  console.log('block.confirmations:', block.confirmations)

  let new_unspend_transactions = []
  for (const txid of block.tx) {
    const tx = await beincoind.getRawTransaction(txid, verbosity, blockhash)
    tx.vout.forEach(out => {
      if (out.value > 0) {
        const address = out.scriptPubKey.addresses[0]
        const valueInBIC = out.value
        new_unspend_transactions.push({address, valueInBIC})
      }
    })
  }
  console.log(new_unspend_transactions)
})

bicd.on('hashtx', async(hash) => {
  const txid = hash.toString('hex')
  console.log('hashtx:', txid)

  const verbose = true
  const tx = await beincoind.getRawTransaction(txid, verbose)
  // console.log(tx)

  let new_unspend_transactions = []
  tx.vout.forEach(out => {
    if (out.value > 0) {
      const address = out.scriptPubKey.addresses[0]
      const valueInBTC = out.value
      new_unspend_transactions.push({address, valueInBTC})
    }
  })
  console.log(new_unspend_transactions)
})

bicd.on('rawblock', async (rawBlock) => {
  const block = bitcoin.Block.fromHex(rawBlock);
  console.log("rawblock", block)
  // console.log(blockData)
  //console.log(JSON.stringify(blockData, '\n', 2))
})

bicd.on('rawtx', (rawtxBuffer) => {
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
