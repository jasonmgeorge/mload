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
    let metricsString = "";
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += this.statusString();
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += this.countString();
    metricsString += '\n';
    metricsString += '------------------------------------------------------------\n';
    metricsString += this.responseMapString();
    metricsString += '------------------------------------------------------------\n';

    return metricsString;
  }

  statusString() {
    const stopTime = this.stopTime ? this.stopTime : Date.now();
    const executionTime = ((stopTime - this.startTime) / 1000);
    const rps = this.requestCount / executionTime;


    let statusToString = "";
    statusToString += "Execution Time: " + executionTime + " seconds\n";
    statusToString += "RPS Target: " + config.rps + '\n';
    statusToString += "RPS Actual: " + rps + '\n';
    return statusToString;
  }

  countString() {
    const failureRate = (100 * this.errorCount / this.requestCount);

    let countString = "";
    countString += "Requests:\t" + this.requestCount + '\n';
    countString += "Responses:\t" + this.responseCount + '\n';
    countString += "Successes:\t" + this.successCount + '\n';
    countString += "Failure Rate:\t" + failureRate + '%\n';
    return countString;
  }

  responseMapString() {
    let responseMapString = "";
    responseMapString += "Response Map: " + '\n';
    for(const status in this.responseMap) {
      responseMapString += " [" + status + "]: " + this.responseMap[status] + '\n';
    }
    return responseMapString;
  }


}

module.exports = Metrics;