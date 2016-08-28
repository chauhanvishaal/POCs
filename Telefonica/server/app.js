"use strict";

var snmpRepo = require("./Statistics/ServerStatistics.js");

console.log(snmpRepo.getServerStats());
// let jsonContent = snmpRepo.getServerStatsMock();

// console.log("RAM \n Total - " + jsonContent.stats.ram.total);

// console.log("AverageLoadInMins \n " , jsonContent.stats.averageLoadInMins);
// console.log("Full Json \n" , jsonContent);






