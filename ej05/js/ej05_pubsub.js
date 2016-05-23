// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    function ChildCtrl($scope) {

        var vm = this;

        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        // Emitimos hacia arriba
        vm.emitFromScope = function() {
            $scope.$emit('ChildCtrl:scope:emit', '$scope.$emit from ChildCtrl');
        };

        // Escuchamos lo que nos viene del div padre
        $scope.$on('ParentCtrl:scope:broadcast', function(event, data) {
            vm.messages.push(data);
        });
        
    }

    function SiblingOneCtrl($scope) {
        var vm = this;

        // Para guardar mensajes
        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        // Como ChildCtrl no es descendiente directo nuestro y emite a través de $scope, NO lo escucharemos a pesar de estar suscritos
        $scope.$on('ChildCtrl:scope:emit', function(event, data) {
            vm.messages.push(data);
        });

        // Escuchamos lo que nos viene del div padre
        $scope.$on('ParentCtrl:scope:broadcast', function(event, data) {
            vm.messages.push(data);
        });
    }

    function SiblingTwoCtrl($scope) {

        var vm = this;

        // Para guardar mensajes
        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        // Escuchamos lo que emite nuestro hijo
        $scope.$on('ChildCtrl:scope:emit', function(event, data) {
           vm.messages.push(data);
        });

        // Escuchamos lo que nos viene del div padre
        $scope.$on('ParentCtrl:scope:broadcast', function(event, data) {
            vm.messages.push(data);
        });
    }

    function ParentCtrl($scope) {
        var vm = this;

        // Para guardar mensajes
        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        vm.broadcastFromScope = function() {
            $scope.$broadcast('ParentCtrl:scope:broadcast', '$scope.$broadcast from ParentCtrl');
        };

        // Escuchamos lo que emite nuestro nieto
        $scope.$on('ChildCtrl:scope:emit', function(event, data) {
            vm.messages.push(data);
        });
    }

       
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .controller('ParentCtrl', ParentCtrl)
        .controller('SiblingOneCtrl', SiblingOneCtrl)
        .controller('SiblingTwoCtrl', SiblingTwoCtrl)
        .controller('ChildCtrl', ChildCtrl);

    ChildCtrl.$inject = ['$scope'];
    ParentCtrl.$inject = ['$scope'];
    SiblingOneCtrl.$inject = ['$scope'];
    SiblingTwoCtrl.$inject = ['$scope'];

})();