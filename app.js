const CLI = require('./cli');
const Dispatch = require('./dispatch');
const config = require('./config');

const cli = new CLI();
config.set(cli.options);
cli.start();

console.log(config.url);

const dispatch = new Dispatch(cli.options);
dispatch.start();


// temporary stop functionality
function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
async function stop() {
  await sleep(2);
  dispatch.stop();
}
stop();