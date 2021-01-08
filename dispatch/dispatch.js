const axios = require("axios");
const config = require('../config');
const event = require('../event');

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
    event.emit('dispatchStart');
    this.sendRequest();
  }

  stop() {
    console.log("Stopping dispatch for " + config.url);
    this.continue = false;
    event.emit('dispatchStop');
  }

  async sendRequest(delay) {
    await sleep(delay);
    if(this.continue) {
      this.sendRequest(this.requestInterval());

      event.emit('apiRequest');
      const res = await axios.post(config.url, this.requestPayload(), this.requestOptions)
        .catch(error => {
          if(error && error.response) {
            event.emit('errorResponse', {
              status: error.response.status,
              data: error.response.data
            });
          }
        });

      if(res && res.data) {
        event.emit('successResponse', {
          status: res.status
        });
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
      date: new Date().toISOString(),
      requests_sent: this.requestCount
    }
  }
}

module.exports = Dispatch;