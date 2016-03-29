// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    angular
        .module('app', [])
        .controller('MainCtrl', MainCtrl)
        .directive('changecase', changecaseDirective);


    function changecaseDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                // Actua sobre el elemento del DOM que va a ver el usuario (model to view)
                ngModel.$formatters.push(function(value) {
                    return value.toUpperCase();
                });

                // Actua sobre el elemento del modelo que el usuario cambia a través del input (view to model)
                ngModel.$parsers.push(function(value) {
                    return value.toLowerCase();
                });
            }
        }
    }

    function MainCtrl() {
        var vm = this;
        vm.data = { name: ''};
    }

})();

