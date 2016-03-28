// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    angular
        .module("app", [])
        .controller("patternController", patternController);
    
    
    function patternController() {
        var vm = this;
  
        vm.requeridoNombre=true;
        vm.patternNombre=/^[a-zA-ZñÑ]*$/;
    };
    
})();