const CLI = require('./cli');
const Dispatch = require('./dispatch');
const Metrics = require('./metrics');
const event = require('./event');
const config = require('./config');

const cli = new CLI();
config.set(cli.options);
cli.start();

const metrics = new Metrics();
metrics.start();

const dispatch = new Dispatch(cli.options);
dispatch.start();
event.on('stop', function() {
  dispatch.stop();
  console.log(metrics.toString());
})

cli.output(metrics.statusString());