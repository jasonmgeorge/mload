const axios = require("axios");

class Dispatch {

  constructor({url, auth, rps}){
    this.url = url;
    this.auth = auth;
    this.rps = rps;
    this.continue = false;
  }

  start() {
    console.log("Starting dispatch for " + this.url + " at " + this.rps + " RPS");
    this.sendRequest();
  }

  stop() {

  }

  async sendRequest() {
    const res = await axios.get(this.url, {headers: { Accept: "application/json" }});
    console.log(res);

    if(this.continue) {
      this.sendRequest();
    }
  }

}

module.exports = Dispatch;