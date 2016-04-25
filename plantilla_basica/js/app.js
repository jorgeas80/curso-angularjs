// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    
    // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
    'use strict';
    
    // Cargamos la aplicacion AngularJS
    var app = angular.module('app', []);
    
})();