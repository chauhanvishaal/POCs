
//this vs $scope
//http://stackoverflow.com/questions/16619740/angular-should-i-use-this-or-scope
//https://johnpapa.net/do-you-like-your-angular-controllers-with-or-without-sugar/

//export const TodoController = function (){
class TodoController {
	constructor($scope) {
		this.$scope = $scope ;

		this.$scope.todoList = 
		[
			{ 'desc':'item 1',
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

		this.$scope.editable = false;
		this.$scope.todoCount =  $scope.todoList.length ;
		let currentItemId = -1;
	}


	add() {
		let item  = { 'desc':'newItem',
						 //'id': 4 ,
						 'status': 0 } ;
		let lastItem = 0;
	 	if(this.$scope.todoList.length > 0){ 
	 		lastItem = this.$scope.todoList.length -1
	 		item.id = this.$scope.todoList[lastItem].id + 1 ;
			}
		else{
			item.id	 = 1 ;
		}
		this.$scope.todoList.push(item);
	}

	delete(id) {
		this.currentItemId = id;
		let index = this.$scope.todoList.findIndex(this.findById, id) ;
		this.$scope.todoList.splice(index, 1 );
	}
	
		edit(id) {
			this.currentItemId = id;
			let itemIndex = this.$scope.todoList.findIndex(this.findById, id) ;
			this.$scope.todoList[itemIndex].editable = !this.$scope.todoList[itemIndex].editable ;
		}

	findById(element){
		//this is apparently equals currentItemId cos it is passed as second argument to findIndex
		if(element.id === this) 
			return element ;
	}
}

export {TodoController} ;