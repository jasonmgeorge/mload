const CLI = require('./cli/cli.js');
const Dispatch = require('./dispatch/dispatch.js');
const Metrics = require('./metrics/metrics.js');
const event = require('./utils/event.js');
const config = require('./config/config.js');

const cli = new CLI();
config.set(cli.options);
cli.start();

const metrics = new Metrics();
metrics.start();

const dispatch = new Dispatch(cli.options);
dispatch.start();

event.on('metrics:status', function(message) {
  cli.displayMessage(metrics.statusString());
})

event.on('stop', function() {
  dispatch.stop();
  metrics.stop();
  cli.stop();
  cli.displayMessage(metrics.toString());
});

