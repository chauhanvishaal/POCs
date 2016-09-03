"use strict";

let logger = require('./utils/logger.js');
logger.init('app');

var express = require('express');

const statisticsService = require("./services/statistics/index.js");

var app = express();

app.get('/', function (req, res) {
	statisticsService.getStatistics().then(function(response){
		//res.send("success.. response.length = " + response.size);
		logger.log("In app.get, response = %s", response);
		res.send(response);
	});
});

var server = app.listen(9091, function () {
var host = server.address().address;
var port = server.address().port;

logger.log("Listening at http://%s:%s", host, port);

});