import angular from 'angular';

angular.module('todoApp').directive("clickToEdit", 
    ["$document", 
    function ($document) {
    let editorTemplate = 
        `<div>
            <div ng-hide="view.editorEnabled"> 
                <input type = button value = Edit ng-click="enableEditor()"/> 
            </div> 
            <div ng-show="view.editorEnabled"> 
                <input type = button value = Save ng-click="disableAndSave()"/>
                <input type = button value = Cancel ng-click="disableEditor()"/>
            </div> 
        </div>`;

    return {
        restrict: "AE",
        replace: true,
        template: editorTemplate,
        scope: {
            edit    : '&onEdit',
            cancel  : '&onCancel',
            save    : '&onSave',
            value   : "=clickToEdit"
            },
        //transclude: true,
        link: function (scope, element, attrs, ctrl,transclude) {
            scope.view = {
                editableValue: scope.value,
                editorEnabled: false
            };
            //need to use first element cause zero element is empty space
            //element.children()[0].append(transclude()[1]);
            scope.enableEditor = () => {
                scope.view.editorEnabled = true;
                //scope.view.editableValue = scope.value;
                scope.edit({'id': scope.value}) ;
                
                //$document is jqlite document a subset of window.document. cant find by id only by element
                //so below line of code wont work.
                //$document.getElementById('tododesc'+ scope.value).focus();

                //Javascript function to focus on input element
                setTimeout(function (id = scope.value) {
                    //element.find('input')[0].focus();
                    document.getElementById('tododesc'+ id).focus();
                    //element.find('input').focus().select(); // w/ jQuery
                });
            };

            scope.disableEditor = function () {
                scope.view.editorEnabled = false;
                scope.cancel({'id': scope.value}) ;
            };

            scope.disableAndSave = function () {
                scope.view.editorEnabled = false;
                scope.save({'id': scope.value});
            };

        }
    };
}]);