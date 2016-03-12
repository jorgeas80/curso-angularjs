// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // Esta funcion es el controlador que asociamos a la vista del ej05
    function ej05Controller($scope) {

        $scope.show = true;
        $scope.theField = 'hello';   
        
        $scope.obj = {
            show: true,
            theField: 'hello'
        };
    }

    // Cargamos la aplicacion AngularJS
    var app = angular.module('ejerciciosApp', []);

    app.controller('ej05Controller', ej05Controller);
    ej05Controller.$inject = ['$scope'];

})();