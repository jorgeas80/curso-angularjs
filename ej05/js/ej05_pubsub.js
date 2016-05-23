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

    function SiblingOneCtrl($rootScope, $scope) {
        var vm = this;

        // Para guardar mensajes
        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        // Emitimos a todo el que escuche con $rootScope.$on
        vm.emitFromRootScope = function() {
            $rootScope.$emit('SiblingOneCtrl:rootScope:emit', '$rootScope.$emit from SiblingOneCtrl');
        };

        // Emitimos a todo el que escuche con $rootScope.$on y también con $scope.$on
        vm.broadcastFromRootScope = function() {
            $rootScope.$broadcast('SiblingOneCtrl:rootScope:broadcast', '$rootScope.$broadcast from SiblingOneCtrl');
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

    function SiblingTwoCtrl($rootScope, $scope) {

        var vm = this;

        // Para guardar mensajes
        vm.messages = [];

        // Para borrar los mensajes
        vm.clearMsg = function() {
            vm.messages = [];
        };

        // Escuchamos lo emitido a través de $rootScope. Si escucháramos el mismo evento con $scope.$on, no nos llegaria,
        // porque está emitido a través de $emit.
        var listener = $rootScope.$on('SiblingOneCtrl:rootScope:emit', function(event, data) {
            vm.messages.push(data);
        });

        // Como el evento está emitido a través de broadcast, nos va a llegar tanto si lo escuchamos desde $scope como
        // si lo escuchamos desde $rootScope
        $scope.$on('SiblingOneCtrl:rootScope:broadcast', function(event, data) {
            vm.messages.push(data);
        });

        // Escuchamos lo que emite nuestro hijo
        $scope.$on('ChildCtrl:scope:emit', function(event, data) {
           vm.messages.push(data);
        });

        // Escuchamos lo que nos viene del div padre
        $scope.$on('ParentCtrl:scope:broadcast', function(event, data) {
            vm.messages.push(data);
        });

        // Las suscripciones realizadas mediante $rootScope.$on han de destruirse explicitamente cuando se destruya $scope
        $scope.$on('$destroy', listener);
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
    SiblingOneCtrl.$inject = ['$rootScope', '$scope'];
    SiblingTwoCtrl.$inject = ['$rootScope', '$scope'];

})();