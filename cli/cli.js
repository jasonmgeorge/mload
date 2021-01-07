const yargs = require("yargs");
const readline = require("readline");
const config = require('../config');

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
  }

  start(){
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.setPrompt('mload> ');
    rl.prompt();
    rl.on('line', function(line) {
      switch(line.trim()) {
        case 'stop':
          console.log("Received Stop Command");
          rl.close();
          break;
        case 'help':
        default:
          console.log('Type "stop" to stop sending requests');
          break;
      }
    })
  }
}

module.exports = CLI;