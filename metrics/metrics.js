const event = require('../event');

class Metrics {

  constructor(){
    this.init();
    console.log(this.requestCount);
  }

  init() {
    this.requestCount = 0;
    this.responseCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.responseMap = {};
  }

  start() {
    let self = this;

    event.on('request', function() {
      self.requestCount++;
    });

    event.on('success', function(data) {
      self.responseCount++;
      self.successCount++;
      self.mapStatus(data.status);
    });

    event.on('error', function(data) {
      self.responseCount++;
      self.errorCount++;
      self.mapStatus(data.status);
    })
  }

  mapStatus(status) {
    if(!status) { return; }

    if(!this.responseMap[status]) {
      this.responseMap[status] = 0;
    }
    this.responseMap[status]++;
  }

  toString() {
    let metricsString = "";
    metricsString += "Total Requests: " + this.requestCount + '\n';
    metricsString += "Total Responses: " + this.responseCount + '\n';
    metricsString += "Total Successes: " + this.successCount + '\n';
    metricsString += "Failure Rate: " + (100 * this.errorCount / this.requestCount) + '%\n';
    metricsString += "Response Map: " + '\n';

    for(const status in this.responseMap) {
      metricsString += " [" + status + "]: " + this.responseMap[status] + '\n';
    }

    return metricsString;
  }
}

module.exports = Metrics;