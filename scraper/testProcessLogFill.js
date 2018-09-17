var fs = require('fs');
var processLogFill = require('./util/processLogFill.js');

const inputPath = __dirname + '/mainnet_logs.json';
const inputJSON = fs.readFileSync(inputPath, 'utf8');
const logs = JSON.parse(inputJSON)
async function processLogs() {
  const transactions = [];
  for (let i=0; i < logs.length; i++) {
    const processedLogFill = await processLogFill(logs[i]);
    transactions.push(processedLogFill);
  }
  return transactions;
}
processLogs().then(output => {
  const outputPath = __dirname + '/mainnet_transactions.json';

  //Write pruned CSV file into pruned_exports
  fs.writeFile(outputPath, JSON.stringify(output), function (err) {
          if (err) throw err;
          console.log('finished creating new mainnet_transactions.json at ' + outputPath)
      });
})

