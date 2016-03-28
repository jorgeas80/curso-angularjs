// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .provider('customer', customerPvd)
        .constant('configData', {
            year: 2016,
            quarter: 'Q1'
        })
        .config(function(configData, customerProvider) {
            // Angular también tiene un servicio $log más completo
            console.log("DEBUG - Año: " + configData.year);
            console.log("DEBUG - Trimestre: " + configData.quarter); 

            // Podemos usar aquí el provider para configurarlo. Por lo demás,
            // funciona como un factory
            customerProvider.initCustomers();
        })

        .directive("yearlyData", yearlyDataDirective)

        .controller('ej07Controller', ej07Controller);
        ej07Controller.$inject = ['configData', 'customer'];


    function customerPvd() {

        // Esto se ejecutaría antes de iniciar la app. Podemos configurar el provider.
        this.initCustomers = function() {
            console.log("Iniciando servicio de obtención de clientes...");
        };

        // Este método ha de estar forzosamente. Es lo que el provider va a exponer. 
        // Lo que hay en este método es lo mismo que había en el factory del 
        // ejemplo ej06_factory.js
        this.$get = function() {
            var f = {};

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
    function ej07Controller(configData, customer) {

        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customer.getCustomers();
        vm.configuration = configData;
    }



})();