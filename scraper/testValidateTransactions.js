var fs = require('fs');
// var {
//     assetDataUtils,
//     BigNumber,
//     ContractWrappers,
//     generatePseudoRandomSalt,
//     Order,
//     orderHashUtils,
//     signatureUtils,
//     SignerType,
//     RPCSubprovider,
//     Web3ProviderEngine
// } = require('0x.js');

// const providerEngine = new Web3ProviderEngine();
// providerEngine.addProvider(new RPCSubprovider('https://mainnet.infura.io/v3/abbfbb3d267b4bc882ff8a1080a2a0f6'));
// providerEngine.start();
// const contractWrappers = new ContractWrappers(providerEngine, {  networkId: 1});
var zeroEx = require('../shared/zeroEx.js');
var BigNumber = require('bignumber.js');





const inputPath = __dirname + '/mainnet_transactions.json';
const inputJSON = fs.readFileSync(inputPath, 'utf8');
const transactions = JSON.parse(inputJSON)
async function processTransactions() {
  const orders = [];
  for (let i=0; i < transactions.length; i++) {
    console.log(i)
    const transaction = transactions[i][0];
    transaction.expirationUnixTimestampSec = new BigNumber(transaction.expirationUnixTimestampSec)
    transaction.makerFee = new BigNumber(transaction.makerFee)
    transaction.makerTokenAmount = new BigNumber(transaction.makerTokenAmount)
    transaction.salt = new BigNumber(transaction.salt)
    transaction.takerFee = new BigNumber(transaction.takerFee)
    transaction.takerTokenAmount = new BigNumber(transaction.takerTokenAmount)

    await zeroEx.exchange.validateOrderFillableOrThrowAsync(transaction).then(() => {
      transaction.expirationUnixTimestampSec = transaction.expirationUnixTimestampSec.toNumber()
      transaction.makerFee = transaction.makerFee.toNumber()
      transaction.makerTokenAmount = transaction.makerTokenAmount.toNumber()
      transaction.salt = transaction.salt.toNumber()
      transaction.takerFee = transaction.takerFee.toNumber()
      transaction.takerTokenAmount = transaction.takerTokenAmount.toNumber()
      console.log('valid! transaction:', transaction)
    }).catch((error) => {

    })
  }
  return transactions;
}
 processTransactions()


