
	angular.module('todoApp').controller('TodoController', ['$scope', function($scope){
		
		$scope.todoList = [{ 'desc':'item 1',
							 'id': 1 ,
							 'status': 0, 
							 'editable': false },
						   { 'desc':'item 2',
							 'id': 2 ,
							 'status': 1,
							 'editable': false },
						   { 'desc':'item-3',
							 'id': 3 ,
							 'status': 0 ,
							 'editable': false }
						]; 
		$scope.editable = false;
		$scope.todoCount =  $scope.todoList.length ;
		let currentItemId = -1;

		$scope.add = function(){
			let item  = { 'desc':'newItem',
							 //'id': 4 ,
							 'status': 0 } ;
			let lastItem = $scope.todoList.length - 1;
			item.id = $scope.todoList[lastItem].id + 1 ;
			$scope.todoList.push(item);
		}

		$scope.delete = function (id) {
			$scope.todoList.splice(id -1, 1 );
		}

		$scope.edit = function (id){
			//$scope.editable = !$scope.editable ;
			currentItemId = id;
			let itemIndex = $scope.todoList.findIndex(findById, id) ;
			$scope.todoList[itemIndex].editable = !$scope.todoList[itemIndex].editable ;

		}

		function findById(element){
			if(element.id === currentItemId) 
				return element ;
		}

	}]);
