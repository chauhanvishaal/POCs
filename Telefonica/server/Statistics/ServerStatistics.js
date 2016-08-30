"use strict";
let debug = require("debug");
let log = debug('ServerStatistics:log');
log("test log message");
let logError = debug('ServerStatistics:error');
logError("test error message");
// var log1 = log("app:log");
// log1.log = console.log.bind(console);
// log1("log1 msg");

//log.error = console.error.bind(console);

let config = require("../config.json");
let snmp = require("net-snmp");
let Q = require("q");
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

//var stats = getServerStats();
log("From log - Main stats = ");


//Mock method
exports.getServerStatsMock = function(){
  let mockData  = require("./ServerStatisticsMockData.json");
  return mockData;
};

exports.getServerStats = function (){
//function getServerStats (){
	let stats = responseBuilder();
	log ("getServerStats - stats =" + stats);

	session.trap(snmp.TrapType.LinkDown,function(error){
		if(error)
			logError("LinkDown: " + error);
	});

	return stats ;
};

function responseBuilder(){
	let oidArray = [];
	let stats = {};
	let oidElement;

	var responseBuilderCallBack = function(oidValue){
		//assign values to the object properties created earlier
		stats[oidElement] = oidValue ;
		log("responseBuilderCallBack - " + oidValue );
		log("responseBuilderCallBack stats object - " + JSON.stringify(stats));		
		return stats ;
	};

	for(oidElement in config.oids){
		//log(config.oids[oid]);
		//getResource(Array.from(config.oids[oid]));
		let oidKey = config.oids[oidElement] ;
		oidArray.push(oidKey);

		let oidValue = getResource(oidArray,responseBuilderCallBack);

		//Add each oid key/ value to object
		log("oidValue =" + oidValue);
		//create return object properties with empty values
		stats[oidElement] = "null";
		//keep only one oid in the oidArray, so pop the current
		oidArray.pop();
	}

	log("responseBuilder stats object - ", stats);
	return stats;
};

function getResource(oid,responseBuilderCallBack){

	let oidCallBack = function (oidValue){ 
		
		log("oidCallBack oidvalue - " + oidValue);
		//response = oidValue ; 
		return responseBuilderCallBack(oidValue);
	};

	function snmpSessionCallBack (error, varbinds){
		let retValue ;
		if(error){
			logError(error);
			return oidCallBack("");
		} else {
			for(let i = 0; i < varbinds.length;i++)
			{
				if(snmp.isVarbindError(varbinds[i])){
					logError("VarbindError:" + snmp.varbindError(varbinds[i]))
					//Todo : log error
					//oidValue = "";
					retValue = "";
					return oidCallBack("");
				}
				else
				{
					//log(varbinds[i].oid + " = " + varbinds[i].value);
					retValue = varbinds[i].value;
					return oidCallBack(varbinds[i].value);
				}
			}
		}

		//log(varbinds[0].oid + " = " + varbinds[i].value);
		//return varbinds[i].value ;
	};
	
	return session.get (oid, snmpSessionCallBack);
	//return response;

	// var deferred = Q.defer();
	// session.get(oid,snmpSessionPromise, deferred.makeNodeResolver());
	// return deferred.promise;

	//return Q.nfcall(session.get(oid,snmpSessionPromise));

	//return Q.nfapply(session.get(oid,snmpSessionPromise));
	// return Q.nfcall(session.get(oid,snmpSessionPromise)).then(
	// 	function(){
	// 		return retValue ;
	// 	});
	
};

