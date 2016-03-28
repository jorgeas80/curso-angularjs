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
            console.log("DEBUG - Año: " + configData.year);
            console.log("DEBUG - Trimestre: " + configData.quarter); 

            // Podemos usar aquí el provider para configurarlo. Por lo demás,
            // funciona como un factory
            customerProvider.initCustomers();
        })
    
        .directive("yearlyData", yearlyDataDirective)
        .controller('ej08Controller', ej08Controller);
        ej08Controller.$inject = ['configData', 'customer'];


    
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
        
    // Así creamos la directiva. Básicamente, devolvemos un factory
    function yearlyDataDirective() {

        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,
            
            /**
             * Aquí estamos pasandole a la directiva argumentos, para que 
             * pueda crear su propio scope a partir de elementos copiados
             * del scope padre. Lo metemos todo en un span porque replace:true nos 
             * fuerza a generar un solo elemento HTML. Si no, da error.
             * Aquí estamos consiguiendo dos cosas:
             * 1. Separar la directiva del controlador, pero a la vez
             * 2. Poder utilizar variables que vengan del controlador
             * El problema es que el enlace es unidireccional. Si cambiamos el valor 
             * de una de las variables del scope de la directiva (el atributo 'year' 
             * en este caso), el controlador no se entera porque el enlace mediante 
             * "@" es * unidireccional
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
                "</span>",
            ].join(''),
            
            scope: {
                /**
                 * Esto copia el valor del atributo "year" en el scope de la 
                 * directiva. Sea cuál sea el valor de "year". En nuestro ejemplo 
                 * particular, en el HTML hemos hecho que year sea igual a un valor
                 * del scope, pero podríamos haberlo escrito a pelo: 2016. Lo
                 * importante es no desviarnos de la idea de que la "@" hace que el 
                 * valor se copie DESDE el atributo HTML HACIA el scope de la 
                 * directiva
                 **/
                year: "@", 
                quarter: "@",
                text: "@"
            }
        }

        return directiveDefinitionObject;
    }
    
    // Esta funcion es el controlador
    function ej08Controller(configData, customer) {
        
        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customer.getCustomers();
        vm.configuration = configData;
    }

})();