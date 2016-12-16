angular.module('todoApp')
.controller('ContactController',[function(){
	let vm = this ;
	vm.contactMaster = {};
	vm.contact = {};
	vm.save = function(contact){
		vm.contactMaster = angular.copy(vm.contact) ;
	}

	vm.reset = function(){
		vm.contact = vm.contactMaster ;
	}
}]);