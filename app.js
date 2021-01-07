const CLI = require('./cli');
const Dispatch = require('./dispatch');

const cli = new CLI();
cli.start();

const dispatch = new Dispatch(cli.options);
dispatch.start();