const yargs = require("yargs");
const readline = require("readline");
const config = require('../config/config.js');
const event = require('../event/event.js');

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

    this.active = false;
  }

  start(){
    const self = this;
    this.active = true;
    this.rl.on('line', function(line) {
      switch(line.trim()) {
        case 'stop':
          event.emit('stop');
          self.rl.close();
          break;
      }
    })
  }

  stop(){
    this.active = false;
  }

  displayMessage(message){
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);

    if(this.active) {
      console.log('Type "stop" to stop sending requests');
      console.log();
      console.log("Executing load test for " + config.url);
    }
    console.log(message);
    if(this.active) {
      this.rl.prompt(true);
    }
  }
}

module.exports = CLI;