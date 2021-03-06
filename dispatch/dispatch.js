const axios = require("axios");
const config = require('../config/config.js');
const event = require('../utils/event.js');

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

class Dispatch {

  constructor(){
    this.isActive = false;
    this.requestCount = 0;
    this.requestOptions = {
      timeout: 5000,
      headers: {
        Accept: "application/json",
        "X-Api-Key": config.auth
      },
    };
  }

  start() {
    this.isActive = true;
    event.emit('dispatch:start');
    this.sendRequest();
  }

  stop() {
    this.isActive = false;
    event.emit('dispatch:stop');
  }

  async sendRequest(delay) {
    await sleep(delay);
    if(this.isActive) {
      this.sendRequest(this.requestInterval());

      event.emit('dispatch:apiRequest');
      const res = await axios.post(config.url, this.requestPayload(), this.requestOptions)
        .catch(error => {
          if(error && error.response) {
            event.emit('dispatch:errorResponse', {
              status: error.response.status,
              data: error.response.data
            });
          }
        });

      if(res && res.data) {
        event.emit('dispatch:successResponse', {
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