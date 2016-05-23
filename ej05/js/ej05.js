// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // Esta funcion es el controlador que asociamos a la vista del ej05
    function ej05Controller($scope) {

        // Estas variables serán copiadas por valor si alguna directiva dentro de este controlador crea su propio scope heredado (ej: ng-if, ng-switch)
        // Es decir: EL SCOPE HIJO Y EL PADRE QUEDARÁN DESCONECTADOS EN LO REFERENTE A ESTAS VARIABLES
        $scope.show = true;
        $scope.theField = 'hello';   
        
        // Estas variables serán copiadas por referencia si alguna directiva dentro de este controlador crea su propio scope heredado (ej: ng-if, ng-switch)
        // Es decir: EL SCOPE HIJO Y EL PADRE SEGUIRÁN CONECTADOS EN LO REFERENTE A ESTAS VARIABLES
        $scope.obj = {
            show: true,
            theField: 'hello'
        };
    }

    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .controller('ej05Controller', ej05Controller);

    ej05Controller.$inject = ['$scope'];

})();