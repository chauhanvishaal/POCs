"use strict";
let debug = require("debug");
let log = debug('ServerStatistics:log');
let logError = debug('ServerStatistics:error');


let config = require("../config.json");
let snmp = require("net-snmp");
let Q = require("q");

let options = {
    port: config.snmpEndpoint.port, //default
    // retries: 1,
    timeout: 5000
    //version: config.snmpEndpoint.version
};

let oidValues = new Map();

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
	let requestOids = createRequest();
	log ("getServerStats - requestOids =" + requestOids);
	getResource(requestOids);
	// .then(function(){
	// 	responseBuilder;
	// });
	log("In getServerStats, Post getResource(), oidValues length = ", oidValues.size);

	session.trap(snmp.TrapType.LinkDown,function(error){
		if(error)
			logError("LinkDown: " + error);
	});

	return requestOids ;
};

function createRequest(){
	let oidArray = [];
	let stats = {};
	let oidElement;

	for(oidElement in config.oids){
		let oidKey = config.oids[oidElement] ;
		oidArray.push(oidKey);
	}
	return oidArray;
};

function responseBuilder(response){
	log("In responseBuilder response.length" + response.size );
	log("In responseBuilder oidValues.length" + oidValues.size );
};

function getResource(oids){

	session.get (oids, function (error, varbinds){
		log("In session.get(), oids.length = " + oids.length);		
		let retValue ;
		if(error){
			logError(error);
		} else {
			for(let i = 0; i < varbinds.length;i++)
			{
				if(snmp.isVarbindError(varbinds[i])){
					logError("VarbindError:" + snmp.varbindError(varbinds[i]))
					retValue = "";
				}
				else
				{
					log(varbinds[i].oid + " = " + varbinds[i].value);
					retValue = varbinds[i].value;
					oidValues.set(varbinds[i].oid.toString()),varbinds[i].value.toString() ;
				}
			}
		}
		log("in session.get() callback, oidValues has =%s elements", oidValues.size);
		responseBuilder(oidValues);
	});
	
};
