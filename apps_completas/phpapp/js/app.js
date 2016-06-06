// IIFE to avoid polluting global space
(function() {
    
    // strict mode for ECMA5: http://www.w3schools.com/js/js_strict.asp
    'use strict';

    // Create module and needed objects
    angular
        .module('app', ['ngRoute', 'ngResource'])
        .config(RoutingConfig)


    // Specify injections. Not mandatory but it's ok
    RoutingConfig.$inject = ['$routeProvider', '$httpProvider'];


    // Config function here
    function RoutingConfig($routeProvider, $httpProvider) {

        // Reset headers to avoid OPTIONS request (aka preflight)
        // We shouldn't do that in production app, but for a simple example is ok
        // More info here: http://stackoverflow.com/a/33662315/593722
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};


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