'use strict';
var Q = require('q');


function getPromiseFulfilled(info) {
    return Q(info || '1 inputPromise fulfilled');
}

function getPromiseRejected(reason) {
    return Q.reject(reason || 'inputPromise rejected');
}
/*
Scenario 1 
===========
If you return a value in a handler, outputPromise will get fulfilled.
*/
function runScenario1() {
    console.log('Scenario 1 is running...');

    getPromiseRejected() // inputPromise
        .then( // outputPromise
            function(input) {
                console.log('Unreachable code');
            },
            function(reason) {
                console.log(reason);
                //return void 0; returns undefined
            }
        ).then(
            function(input) {
                console.log('outputPromise fulfilled'+ input);
                return "o/p promise fullfilled";
            }
        );
}
var s1 = runScenario1();
console.log("s1 - " + s1);

function runScenario2() {
    console.log('Scenario 2 is running...');

    getPromiseFulfilled() // inputPromise
        .then( // outputPromise
            function(input) {
                console.log(input);
                //throw 'Error from inputPromise handler';
            },
            function(reason) {
                console.log('Unreachable code');
            }
        ).fail(
            function(reason) {
                console.log('outputPromise rejected, reason: ' + reason);
            }
        );
}

//runScenario2();

/*
Scenario 9
===========
If you have a number of promise-producing functions that need
to be run sequentially, you can of course do so manually:
return foo(initialVal).then(bar).then(baz).then(qux);
*/
function runScenario9() {
    console.log('Scenario 9 is running...');

    var getPromise1 = function() {
        return getPromiseFulfilled('promiseA fulfilled') // promiseA
            .then( // promise B
                function(info) {
                    console.log(info);
                    return getPromiseFulfilled('promiseC fulfilled') // promiseC
                        .then( // promiseD
                            console.log
                        );
                }
            );
    };

    var getPromise2 = function() {
        return getPromiseRejected('promiseE rejected') // promiseE
            .fail( // promiseF
                console.log
            );
    };

    var getPromise3 = function() {
        return getPromiseFulfilled('promiseG fulfilled') // promiseG
            .then( // promise H
                function(info) {
                    console.log(info);
                    return getPromiseFulfilled('promiseI fulfilled') // promiseI
                        .then( // promiseJ
                            function(info) {
                                console.log(info);
                                return getPromiseFulfilled('promiseK fulfilled') // promiseK
                                    .then( // promiseL
                                        console.log
                                    );
                            }
                        );
                }
            );
    };

    getPromise1().then(getPromise2).then(getPromise3);
}

//runScenario9();