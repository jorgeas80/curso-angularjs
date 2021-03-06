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
        .factory('customerFactory', customerFactory)
        .directive("caYearlyData", yearlyDataDirective)
        .controller('ej09Controller', ej09Controller);
   
    ej09Controller.$inject = ['configData', 'customerFactory'];


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


    function yearlyDataDirective() {
        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,

            /**
             * Aquí estamos pasandole a la directiva argumentos, para que 
             * pueda crear su propio scope a partir de elementos copiados
             * del scope padre. Además, estamos sincronizando los elementos
             **/
            template: [
                "<span>",
                    "<p>{{text}}</p>",
                    "<ul>",
                        "<li>",
                            "<strong>Año: </strong> {{year}}", 
                            "<button ng-click='year=2015'>Cambiar valor de scope.year de la directiva</button>",
                        "</li>",
                        "<li>",
                            "<strong>Trimestre: </strong> {{quarter}}",
                        "</li>",
                    "</ul>",
                "</span>"
            ].join(''),

            scope: {
                year: "=",
                quarter: "=",
                text: "="
            }
        }

        return directiveDefinitionObject;
    }

    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej09Controller(configData, customerFactory) {

        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customerFactory.getCustomers();
        vm.configuration = configData;
    }
    
})();