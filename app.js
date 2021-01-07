const CLI = require('./cli');
const Dispatch = require('./dispatch');

const cli = new CLI();
cli.start();

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