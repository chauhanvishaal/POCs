"use strict";

var snmpRepo = require("./Statistics/ServerStatistics.js");
var snmpRepoPromise = require("./Statistics/ServerStatisticsPromise.js");

console.log("Main - " + snmpRepo.getServerStats().OneMinAverageLoad);
//console.log("Main - " + snmpRepoPromise.getStats());
// let jsonContent = snmpRepo.getServerStatsMock();

// console.log("RAM \n Total - " + jsonContent.stats.ram.total);

// console.log("AverageLoadInMins \n " , jsonContent.stats.averageLoadInMins);
// console.log("Full Json \n" , jsonContent);






