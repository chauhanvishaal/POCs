"use strict";

//Mock method
exports.getServerStatsMock = function(){
  let mockData  = require("./ServerStatisticsMockData.json");
  return mockData;
};

exports.getServerStats = function(){
let config = require("../config.json");
let snmp = require("net-snmp");
//var snmp = require("snmp-native");

let options = {
    port: config.snmpEndpoint.port, //default
    // retries: 1,
    timeout: 5000,
    version: config.snmpEndpoint.version
};
let session  = snmp.createSession (
	config.snmpEndpoint.host,
	config.snmpEndpoint.publicString,
	options);

let oids = [
//"1.3.6.1.4.1.2021.10.1.3.1"
"1.3.6.1.4.1.2021.4.5.0"
];

session.get (oids, function(error, varbinds){
	if(error){
		console.error(error);
	} else {
		for(var i = 0; i < varbinds.length;i++)
		{
			if(snmp.isVarbindError(varbinds[i]))
				console.error("VarbindError:" + snmp.varbindError(varbinds[i]))
			else
				console.log(varbinds[i].oid + " = " + varbinds[i].value)
		}
	}
});

session.trap(snmp.TrapType.LinkDown,function(error){
	if(error)
		console.error("LinkDown: " + error);
});
};