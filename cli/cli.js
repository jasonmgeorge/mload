const yargs = require("yargs");
const readline = require("readline");
const config = require('../config/config.js');
const event = require('../utils/event.js');

class CLI {

  constructor(){
    this.options =yargs
      .usage("Usage: -u <url>")

      .option("u", { 
        alias: "url",
        describe: "Target URL",
        type: "string",
        demandOption: true
      })

      .option("a", { 
        alias: "auth",
        describe: "Authorization Key",
        type: "string",
        demandOption: true
      })

      .option("r", { 
        alias: "rps",
        describe: "Target requests per second",
        type: "number",
        demandOption: true
      })

      .option("n", { 
        alias: "name",
        describe: "User name to be sent in request payload",
        type: "string",
        demandOption: false
      })

      .argv;
    
    this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    this.rl.setPrompt('> ');

    this.isActive = false;
  }

  start(){
    const self = this;
    this.isActive = true;
    this.rl.on('line', function(line) {
      switch(line.trim()) {
        case 'stop':
          event.emit('cli:stop');
          self.rl.close();
          break;
      }
    })
  }

  stop(){
    this.isActive = false;
  }

  displayMessage(message){
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);

    if(this.isActive) {
      console.log('Type "stop" to stop sending requests');
      console.log();
      console.log("Executing load test for " + config.url);
    }
    console.log(message);
    if(this.isActive) {
      this.rl.prompt(true);
    }
  }
}

module.exports = CLI;