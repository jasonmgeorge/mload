const yargs = require("yargs");

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

      .argv;
  }

  start(){
    
  }
}

module.exports = CLI;