const yargs = require("yargs");
const readline = require("readline");
const event = require('../event');

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
  }

  start(){
    const self = this;
    this.rl.prompt();
    this.rl.on('line', function(line) {
      switch(line.trim()) {
        case 'stop':
          event.emit('stop');
          self.rl.close();
          break;
        case 'help':
        default:
          console.log('Type "stop" to stop sending requests');
          break;
      }
    })
  }

  output(message){
    console.log('\n' + message);
    this.rl.prompt(true);
  }
}

module.exports = CLI;