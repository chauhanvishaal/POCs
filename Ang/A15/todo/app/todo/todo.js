'use strict'

import angular from 'angular';

require('../editButton/editButton');
//using ES5
var TodoController = require('./TodoController');

//Using ES6 syntax
//import {TodoController} from './TodoControllerES6';

angular.module('todoApp').controller('TodoController',TodoController);

//TodoController.$inject = ['$scope'];




