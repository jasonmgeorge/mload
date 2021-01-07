const axios = require("axios");

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

class Dispatch {

  constructor({url, auth, rps}){
    this.url = url;
    this.auth = auth;
    this.rps = rps;
    this.requestInterval = 1 / rps;
    this.continue = false;
  }

  start() {
    console.log("Starting dispatch for " + this.url + " at " + this.rps + " RPS");
    this.continue = true;
    this.sendRequest();
  }

  stop() {

  }

  async sendRequest(delay) {
    if(this.continue) {
      await sleep(delay);
      this.sendRequest(this.requestInterval);
    }
    const res = await axios.get(this.url, {headers: { Accept: "application/json" }});
  }
}

module.exports = Dispatch;