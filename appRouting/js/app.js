
// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // La aplicacion AngularJS
    var app = angular.module('ejerciciosApp', ['ngRoute']);

    // Servicio para iniciar las rutas
    app.constant('routesFolder', 'templates');

    // Las rutas
    app.config(function ($routeProvider, routesFolder) {
        $routeProvider

        .when('/', {
            templateUrl : routesFolder + '/home.html',
        })
        
        .when('/ej01', {
            templateUrl: routesFolder + '/ej01/ej01.html',
        })
        
        .when('/ej02', {
            templateUrl: routesFolder + '/ej02/ej02.html',
        })
        
        .when('/ej03', {
            templateUrl: routesFolder + '/ej03/ej03.html',
        })
        
        .when('/ej04', {
            templateUrl: routesFolder + '/ej04/ej04.html',
            controller: 'ej04Controller'
        })

        .otherwise({
            redirectTo: '/'
        });
    });
})();

