const axios = require("axios");

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

class Dispatch {

  constructor({url, auth, rps}){
    this.url = url;
    this.auth = auth;
    this.rps = rps;
    this.continue = false;
    this.requestInterval = 1 / rps;
    this.requestCount = 0;
    this.user = "Anonymous";
    this.requestOptions = {
      headers: {
        Accept: "application/json",
        "X-Api-Key": this.auth
      }
    };
  }

  start() {
    console.log("Starting dispatch for " + this.url + " at " + this.rps + " RPS");
    this.continue = true;
    this.sendRequest();
  }

  stop() {
    console.log("Stopping dispatch for " + this.url);
    this.continue = false;
  }

  async sendRequest(delay) {
    await sleep(delay);
    if(this.continue) {
      this.sendRequest(this.requestInterval);
      const res = await axios.post(this.url, this.requestPayload(), this.requestOptions)
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

  requestPayload() {
    this.requestCount++;
    return {
      name: this.user,
      date: Date.now().toString(),
      requests_sent: this.requestCount
    }
  }
}

module.exports = Dispatch;