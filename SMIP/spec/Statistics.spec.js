"use strict";

var statisticsService = require('../services/statistics/index.js');
var log = require('../utils/logger.js').log ;
let snmpConnectionConfig = require('../config/config.json');

describe('Statistics Service tests', function () {

    let statisticsJson;

    it('Service throws error when snmpConnectionSettings are undefined', function () {
        expect(statisticsService.getStatistics(undefined).then(function (responseData) {
        })).toThrow();
    });

    it('Service returns valid Json response', function () {
        let connectionSettings = config.snmpConnectionSettings();
        let oids = config.oids() ;
        log("In Specs, oids.length" + oids.size) ;
        statisticsService.getStatistics(connectionSettings, oids ).then(function (responseData) {
            log("statisticsJson" + responseData);
        });
    });

    let config = {
        snmpConnectionSettings: function() {

            let conSettings = {} ;
            conSettings['host'] = snmpConnectionConfig.snmpEndpoint.host ;
            conSettings['publicString'] = snmpConnectionConfig.snmpEndpoint.publicString ;

            conSettings['options'] = {
                port: snmpConnectionConfig.snmpEndpoint.port ,
                timeout: 5000//,
                //version: snmpConnectionConfig.snmpEndpoint.version
            };

            return conSettings ;
        },
        oids : function () {
            return snmpConnectionConfig.oids ;
        }
    }
});


