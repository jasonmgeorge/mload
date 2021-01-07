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
    metricsString += "Requests:\t" + this.requestCount + '\n';
    metricsString += "Responses:\t" + this.responseCount + '\n';
    metricsString += "Successes:\t" + this.successCount + '\n';
    metricsString += "Failure Rate:\t" + (100 * this.errorCount / this.requestCount) + '%\n';
    metricsString += "Response Map: " + '\n';

    for(const status in this.responseMap) {
      metricsString += " [" + status + "]: " + this.responseMap[status] + '\n';
    }

    return metricsString;
  }
}

module.exports = Metrics;