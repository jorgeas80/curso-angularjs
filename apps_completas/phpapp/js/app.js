// IIFE to avoid polluting global space
(function() {
    
    // strict mode for ECMA5: http://www.w3schools.com/js/js_strict.asp
    'use strict';

    // Create module and needed objects
    angular
        .module('app', ['ngRoute', 'ngResource'])
        .config(RoutingConfig)


    // Specify injections. Not mandatory but it's ok
    RoutingConfig.$inject = ['$routeProvider'];


    // Config function here
    function RoutingConfig($routeProvider) {
        $routeProvider
            .when('/listclients', {
                controller: 'GetClientsCtrl as listCtrl',
                templateUrl: 'partials/list_clients.html'
            })

            .when('/addclient', {
                controller: 'AddClientCtrl as addCtrl',
                templateUrl: 'partials/add_client.html'
            })

            .otherwise({
                redirectTo: '/listclients'
            });

    }

    
})();