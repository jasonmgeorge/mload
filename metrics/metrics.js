const event = require('../event');
const config = require('../config');

class Metrics {

  constructor(){
    this.init();
    console.log(this.requestCount);
  }

  init() {
    this.startTime = 0;
    this.stopTime = 0;
    this.requestCount = 0;
    this.responseCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.responseMap = {};
  }

  start() {
    let self = this;

    event.on('dispatchStart', function() {
      self.startTime = Date.now();
    });

    event.on('dispatchStop', function() {
      self.stopTime = Date.now();
    });

    event.on('apiRequest', function() {
      self.requestCount++;
    });

    event.on('successResponse', function(data) {
      self.responseCount++;
      self.successCount++;
      self.mapStatus(data.status);
    });

    event.on('errorResponse', function(data) {
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
    let executionTime = ((this.stopTime - this.startTime) / 1000);
    let rps = this.requestCount / executionTime;
    const failureRate = (100 * this.errorCount / this.requestCount);

    let metricsString = "";
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += "Execution Time: " + executionTime + " seconds\n";
    metricsString += "RPS Target: " + config.rps + '\n';
    metricsString += "RPS Actual: " + rps + '\n';
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += "Requests:\t" + this.requestCount + '\n';
    metricsString += "Responses:\t" + this.responseCount + '\n';
    metricsString += "Successes:\t" + this.successCount + '\n';
    metricsString += "Failure Rate:\t" + failureRate + '%\n';
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += "Response Map: " + '\n';
    for(const status in this.responseMap) {
      metricsString += " [" + status + "]: " + this.responseMap[status] + '\n';
    }
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';

    return metricsString;
  }
}

module.exports = Metrics;