"use strict";

var snmpRepo = require("./Repo/ServerStatistics.js");

console.log(snmpRepo.getServerStats());
let jsonContent = snmpRepo.getServerStatsMock();

console.log("RAM \n Total - " + jsonContent.stats.ram.total);

console.log("AverageLoadInMins \n ");
console.log(jsonContent.stats.averageLoadInMins);
//console.log("AverageLoadInMins \n " + jsonContent.stats.averageLoadInMins);
console.log("Full Json \n");
console.log(jsonContent);
//console.log("Full Json \n" + jsonContent);






