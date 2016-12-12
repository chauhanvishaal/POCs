module.exports = function TodoController($scope){
		
		this.todoList = 
		[
			{ 'desc':'item-1',
			 'id': 1 ,
			 'status': 0, 
			 'editable': false },
		   { 'desc':'item-2',
			 'id': 2 ,
			 'status': 1,
			 'editable': false },
		   { 'desc':'item-3',
			 'id': 3 ,
			 'status': 0 ,
			 'editable': false }
		]; 
		let editable = false;
		let todoCount =  this.todoList.length ;
		let currentItemId = -1;
		let originalDesc ='';
		this.add = function(){
			let item  = { 'desc':'newItem',
							 //'id': 4 ,
							 'status': 0 } ;
			let lastItem = 0;
		 	if(this.todoList.length > 0){ 
		 		lastItem = this.todoList.length -1
		 		item.id = this.todoList[lastItem].id + 1 ;
 			}
			else{
				item.id	 = 1 ;
			}
			this.todoList.push(item);
		}

		this.edit = function (selectedRow){
			//$scope.editable = !$scope.editable ;
			currentItemId = selectedRow.id ; //id;
			let itemIndex = this.todoList.findIndex(findById, currentItemId) ;
			originalDesc = this.todoList[itemIndex].desc;
			this.todoList[itemIndex].editable = !this.todoList[itemIndex].editable ;

		}

		this.cancel = function (selectedRow){
			//$scope.editable = !$scope.editable ;
			currentItemId = selectedRow.id ; //id;
			let itemIndex = this.todoList.findIndex(findById, currentItemId) ;
			this.todoList[itemIndex].desc = originalDesc ;
			this.todoList[itemIndex].editable = false;

		}

		this.delete = function (id) {
			currentItemId = id;
			let index = this.todoList.findIndex(findById, id) ;
			this.todoList.splice(index, 1 );
		}


		function findById(element){
			if(element.id === this) 
				return element ;
		}

}

