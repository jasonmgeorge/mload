const yargs = require("yargs");

class CLI {

  start(){
    this.captureArgConfig();
  }

  captureArgConfig(){
    const options = yargs
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


    let args = "";
    args += "URL:, " + options.url + '\n';
    args += "Auth:, " + options.auth + '\n';
    args += "RPS:, " + options.rps + '\n';
    console.log(args);
  }
}

module.exports = CLI;