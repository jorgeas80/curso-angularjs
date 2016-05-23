// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    function ChildCtrl($scope) {

        var vm = this;

        var messages = [];

        // Emitimos hacia arriba
        vm.emitFromScope = function() {
            $scope.$emit('ChildCtrl:scope:emit', '$scope.$emit from ChildCtrl');
        };
        
    }

    function SiblingOneCtrl() {

    }

    function SiblingTwoCtrl($scope) {

        var vm = this;

        // Para guardar mensajes
        vm.messages = [];


        // Escuchamos lo que emite nuestro hijo
        $scope.$on('ChildCtrl:scope:emit', function(event, data) {
           vm.messages.push(data);
        });


    }

    function ParentCtrl() {

    }

       
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .controller('ParentCtrl', ParentCtrl)
        .controller('SiblingOneCtrl', SiblingOneCtrl)
        .controller('SiblingTwoCtrl', SiblingTwoCtrl)
        .controller('ChildCtrl', ChildCtrl);

    ChildCtrl.$inject = ['$scope'];
    SiblingTwoCtrl.$inject = ['$scope'];

})();