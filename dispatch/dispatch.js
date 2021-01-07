const axios = require("axios");
const config = require('../config');

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

class Dispatch {

  constructor(){
    this.continue = false;
    this.requestCount = 0;
    this.requestOptions = {
      headers: {
        Accept: "application/json",
        "X-Api-Key": config.auth
      }
    };
  }

  start() {
    console.log("Starting dispatch for " + config.url + " at " + config.rps + " RPS");
    this.continue = true;
    this.sendRequest();
  }

  stop() {
    console.log("Stopping dispatch for " + config.url);
    this.continue = false;
  }

  async sendRequest(delay) {
    await sleep(delay);
    if(this.continue) {
      this.sendRequest(this.requestInterval());
      const res = await axios.post(config.url, this.requestPayload(), this.requestOptions)
        .catch(error => {
          if(error && error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          }
        });
      if(res && res.data) {
        console.log(res.data);
      }
    }
  }

  requestInterval() {
    return 1 / config.rps;
  }

  requestPayload() {
    this.requestCount++;
    return {
      name: config.name,
      date: Date.now().toString(),
      requests_sent: this.requestCount
    }
  }
}

module.exports = Dispatch;