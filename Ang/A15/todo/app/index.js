'use strict'

//(function(){
//var $ = require('jquery');
//require('./node_modules/angular/angular.js');
import angular from 'angular';
angular.module('todoApp',[]);

require('./editButton/editButton');
//using ES5
var TodoController = require('./TodoController');

//Using ES6 syntax
//import {TodoController} from './TodoControllerES6';

angular.module('todoApp').controller('TodoController',TodoController);

//TodoController.$inject = ['$scope'];




