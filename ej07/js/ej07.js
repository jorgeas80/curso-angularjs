// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .constant('configData', {
            year: 2016,
            quarter: 'Q1'
        })

        .directive("yearlyData", yearlyDataDirective)
        .factory('customerFactory', customerFactory)
        .controller('ej07Controller', ej07Controller);

        ej07Controller.$inject = ['configData', 'customerFactory'];


    function customerFactory() {
        var f = {};

        /** Aquí estamos ocultando el objeto customers (no lo vamos a devolver).
         * De esta forma, estamos de alguna manera definiendo atributos
         * "privados". Con los service se puede conseguir también, pero esta
         * manera es más clara en cuanto a sintáxis
         **/
        var customers = [
            {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363},
            {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363},
            {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363},
            {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363},
            {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ];

        f.getCustomers = function(customer) {
            return customers;
        }

        f.addCustomer = function(customer) {
            customers.push(customer);
        }

        return f;
    }


    // Nuestra directiva es básicamente un factory
    function yearlyDataDirective() {
        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,

            /** 
             * Aquí estamos sacando información del scope que contiene la
             * directiva. Esto no es reusable. Depende del controlador.
             * Realmente podríamos hacer lo mismo con ng-include.
             *
             * Por otro lado, esta sintáxis (usando join) nos permite escribir
             * el código de la plantilla bien tabulado y sin usar +
             **/
            template: [
                '<ul>',
                    '<li>',
                        '<strong>Año: </strong> {{vm.configuration.year}}',
                    '</li>',
                    '<li>',
                        '<strong>Trimestre: </strong> {{vm.configuration.quarter}}',
                    '</li>',
                '</ul>'
            ].join('')

            /**
             * Si añadimos la opción
             * scope: true,
             * En lugar de compartir el scope con en controlador lo 
             * heredaríamos. Es el comportamiento de directivas como ng-if o 
             * ng-switch
             **/
        }

        return directiveDefinitionObject;
    }


    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej07Controller(configData, customerFactory) {

        var vm = this;

        vm.customers = customerFactory.getCustomers();
        vm.configuration = configData;
    }



})();