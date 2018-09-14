var fs = require('fs');

const inputPath = __dirname + '/mainnet_transactions.json';
const inputJSON = fs.readFileSync(inputPath, 'utf8');
const transactions = JSON.parse(inputJSON)
console.log(transactions.length);

