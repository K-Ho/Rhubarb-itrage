var {ExchangeContract, provider} = require('./util/ethers.js');
var processLogFill = require('./util/processLogFill.js');

var LogFill = ExchangeContract.interface.events.LogFill();

provider.on(LogFill.topics, (log) => {
  var logFill = LogFill.parse(log.topics, log.data);
  console.log('logFill HERE: ', JSON.stringify(logFill));
  processLogFill(log).then((errors) => {
    console.log('Non-critical error(s)(?):', errors);
  }).catch((err) => {
    console.error('CRITICAL ERROR:\n', err);
  });
});

console.log('Listening for LogFill events.');
