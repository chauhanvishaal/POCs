"use strict";

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

//Mock method
exports.getServerStatsMock = function(){
  let mockData  = require("./ServerStatisticsMockData.json");
  return mockData;
};

exports.getServerStats = function(){

	let stats = responseBuilder();
	console.log ("getServerStats - stats =" + stats);

	session.trap(snmp.TrapType.LinkDown,function(error){
		if(error)
			console.error("LinkDown: " + error);
	});
};

function responseBuilder(){
	let oidArray = [];
	let stats = {};
	let oidElement;

	var responseBuilderCallBack = function(oidValue){
		//assign values to the object properties created earlier
		stats[oidElement] = oidValue ;
		console.log("responseBuilderCallBack - " + oidValue );
		console.log("responseBuilderCallBack stats object - " + JSON.stringify(stats));		
		return stats ;
	};

	for(oidElement in config.oids){
		//console.log(config.oids[oid]);
		//getResource(Array.from(config.oids[oid]));
		let oidKey = config.oids[oidElement] ;
		oidArray.push(oidKey);

		let oidValue = getResource(oidArray,responseBuilderCallBack);

		//Add each oid key/ value to object
		console.log("oidValue =" + oidValue);
		//create return object properties
		stats[oidElement] = "";
		oidArray.pop();
	}

	console.log("responseBuilder stats object - ", stats);
	return stats;
};

function getResource(oid,responseBuilderCallBack){

	let oidCallBack = function (oidValue){ 
		
		console.log("oidCallBack oidvalue - " + oidValue);
		//response = oidValue ; 
		responseBuilderCallBack(oidValue);
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
					console.error("VarbindError:" + snmp.varbindError(varbinds[i]))
					//Todo : log error
					//oidValue = "";
					retValue = "";
					return oidCallBack("");
				}
				else
				{
					//console.log(varbinds[i].oid + " = " + varbinds[i].value);
					retValue = varbinds[i].value;
					return oidCallBack(varbinds[i].value);
				}
			}
		}

		//console.log(varbinds[0].oid + " = " + varbinds[i].value);
		//return varbinds[i].value ;
	};
	
	function snmpSessionPromise (error, varbinds){
		let retValue ;
		if(error){
			console.error(error);
		} else {
			for(let i = 0; i < varbinds.length;i++)
			{
				if(snmp.isVarbindError(varbinds[i])){
					console.error("VarbindError:", snmp.varbindError(varbinds[i]))
					//Todo : log error
					//oidValue = "";
				
				}
				else
				{
					console.log(varbinds[i].oid, " = " , varbinds[i].value)
					//oidValue = varbinds[i].value ;
					//return oidCallBack(varbinds[i].value);
					retValue = varbinds[i].value ;
				}
			}
		}
		return retValue ;
	};

	session.get (oid, snmpSessionCallBack);
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

