// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // La aplicacion AngularJS
    var app = angular.module('ejerciciosApp', ['ngRoute']);

    // Servicio para iniciar las rutas
    app.constant('routesFolder', 'resueltos');

    // Las rutas
    app.config(function ($routeProvider, routesFolder) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : routesFolder + '/home.html',
            })
    });
})();

