const CLI = require('./cli');
const Dispatch = require('./dispatch');
const event = require('./event');
const config = require('./config');

const cli = new CLI();
config.set(cli.options);
cli.start();

const dispatch = new Dispatch(cli.options);
dispatch.start();
event.on('stop', function() {
  dispatch.stop();
})