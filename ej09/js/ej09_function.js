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

        .directive("caYearlyData", yearlyDataDirective)
        .controller('ej09Controller', ej09Controller);
   
    ej09Controller.$inject = ['configData', 'customer'];


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

    function yearlyDataDirective() {
        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,

            /**
             * Como change apunta a una función del controlador, la podemos llamar. Ojo a cómo se pasan
             * argumentos a esa función, usando las llaves. Le estamos pasando un argumento estático (2015),
             * pero podríamos pasarle también una variable. 
             * Tal y como está, la llamada a 'change' es equivalente a definir algo así dentro del template de
             * la directiva:
             * <strong>Año: </strong>
             * <input type='text' ng-model='year'> (esto en lugar del button)
             **/
            template: [
                "<span>",
                    "<p>{{text}}</p>",
                    "<ul>",
                        "<li>",
                            "<strong>Año: </strong> {{year}}", 
                            "<button ng-click='change({year: 2015})'>Cambiar valor de scope.year de la directiva</button>",
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
                text: "=",
                
                // En la template de nuestra directiva podemos usar "change" y se mapea automaticamente con lo
                // que pasemos en el atributo "change" del HTML original de nuestra directiva
                change: "&" 
            }
        }

        return directiveDefinitionObject;
    }

    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej09Controller(configData, customer) {

        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customer.getCustomers();
        vm.configuration = configData;
        
        vm.changeYear = function(year) {
            vm.configuration.year = year;
        }
    }
    
})();