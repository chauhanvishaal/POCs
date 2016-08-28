"use strict";

let config = require("../config.json");
let snmp = require("net-snmp");
let options = {
    port: config.snmpEndpoint.port, //default
    // retries: 1,
    timeout: 5000
    //version: config.snmpEndpoint.version
};

let oids = [
//"1.3.6.1.4.1.2021.10.1.3.1"
"1.3.6.1.4.1.2021.10.1.3.1"
//,"1.3.6.1.4.1.2021.10.1.3.2"
//,"1.3.6.1.4.1.2021.10.1.3.3"
//,"1.3.6.1.4.1.2021.4.5"
];

let session  = snmp.createSession (
	config.snmpEndpoint.host,
	config.snmpEndpoint.publicString,
	options);


//Mock method
exports.getServerStatsMock = function(){
  let mockData  = require("./ServerStatisticsMockData.json");
  return mockData;
};

exports.getServerStats = function(){

	responseBuilder();

	session.trap(snmp.TrapType.LinkDown,function(error){
		if(error)
			console.error("LinkDown: " + error);
	});
};

function responseBuilder(){
	let oidArray = [];
	let stats = {};
	for(let oidElement in config.oids){
		//console.log(config.oids[oid]);
		//getResource(Array.from(config.oids[oid]));
		let oidKey = config.oids[oidElement] ;
		oidArray.push(oidKey);
		let oidValue = getResource(oidArray);
		//Add each oid key/ value to object
		stats[oidElement] = oidValue ;
		
		oidArray.pop();
	}
	console.log(stats);
};

function getResource(oid){
	let response = "" ;

	var oidCallBack = function (oidValue){ 
		
		console.log("oidvalue - ",oidValue);
		response = oidValue ; 
	};

	function snmpSessionCallBack (error, varbinds){
		let retValue ;
		if(error){
			console.error(error);
			return oidCallBack("");
		} else {
			for(let i = 0; i < varbinds.length;i++)
			{
				if(snmp.isVarbindError(varbinds[i])){
					//console.error("VarbindError:" + snmp.varbindError(varbinds[i]))
					//Todo : log error
					//oidValue = "";
					retValue = "";
					return oidCallBack("");
				}
				else
				{
					console.log(varbinds[i].oid + " = " + varbinds[i].value)
					//oidValue = varbinds[i].value ;
					//return oidCallBack(varbinds[i].value);
					retValue = varbinds[i].value ;
					next();
				}
			}
		}

		function next(){
			if(retValue){
				oidCallBack(retValue);
			}
		};
	};
	
	session.get (oid, snmpSessionCallBack);
// function foo(address, fn){
//   geocoder.geocode( { 'address': address}, function(results, status) {
//      fn(results[0].geometry.location); 
//   });
// }

// foo("address", function(location){
//   alert(location); // this is where you get the return value
// });
	//oidValue = oidCallBack() ;
	
	return response;
};

