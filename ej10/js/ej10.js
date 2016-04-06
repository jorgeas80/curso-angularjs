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
        .directive("caStatusServer", statusServerDirective)
        .directive("caStatusServer2", statusServerDirective2)
        .directive("caStatusServer3", statusServerDirective3)
        .directive("caCustomer", customerDirective)
        .controller('ej10Controller', ej10Controller);
   
    ej10Controller.$inject = ['configData', 'customer'];


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
    };



    /**
     * Podemos inyectarle servicios en la función de definición, y así podríamos 
     * usarlos desde dentro de la función de link. Ver http://stackoverflow.com/a/20756918/593722
     **/
    function statusServerDirective() {

        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,
            template: "<div>{{texto}}</div>",
            scope: {
                texto:"@"
            },
            
            /**
             * Vamos a manipular el DOM de la directiva para añadirle clases en función de un atributo
             * También podría asignar esas clases en función de otra cosa (ej: el status REAL del
             * servidor). Para eso se pueden inyectar servicios directamente en la función de 
             * definición de la directiva
             **/
            link: function(scope, iElement, iAttrs, controller, transcludeFn) {

                console.log('Funcion link');
            
                switch (iAttrs.estado) {
                    case "error":
                        iElement.addClass("alert");
                        iElement.addClass("alert-danger")
                        break;
                    case "ok":
                        iElement.addClass("alert");
                        iElement.addClass("alert-success")
                        break;
                    case "warning":
                        iElement.addClass("alert");
                        iElement.addClass("alert-warning")
                        break;
                    default:
                        break;
                }

            }

        }

        return directiveDefinitionObject;
    };

    // Otra manera de hacerlo, más verbosa
    function statusServerDirective2() {

        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,
            template: "<div>{{texto}}</div>",
            scope: {
                texto:"@"
            },
            
            // En la función compile no hay scope aun
            compile: function(iElement, iAttrs) {
                
                console.log("Funcion compile...");
                
                
                return {
                    
                    // Ya hay scope, pero las directivas hijas no han sido aun revisadas
                    pre: function(scope, iElement, iAttrs) {
                        console.log("Funcion pre-link");
                    },
                    
                    // Ya hay scope, y además las directivas hijas han sido revisadas
                    post: function(scope, iElement, iAttrs) {
                        console.log('Funcion post-link');
            
                        switch (iAttrs.estado) {
                            case "error":
                                iElement.addClass("alert");
                                iElement.addClass("alert-danger")
                                break;
                            case "ok":
                                iElement.addClass("alert");
                                iElement.addClass("alert-success")
                                break;
                            case "warning":
                                iElement.addClass("alert");
                                iElement.addClass("alert-warning")
                                break;
                            default:
                                break;
                        }

                    }
                }
            } 
        }

        return directiveDefinitionObject;
    };
    
    
    function statusServerDirective3() {

        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,
            transclude: true,   // Usamos transclusion aqui
            template: "<div ng-transclude></div>", // Esto cogerá lo que haya dentro de la directiva automáticamente
            scope: {
            },
            
            // En la función link, modificaremos el DOM de la directiva, para añadirle clases
            link: function(scope, iElement, iAttrs, controller, transcludeFn) {

                console.log('Funcion link');
            
                switch (iAttrs.estado) {
                    case "error":
                        iElement.addClass("alert");
                        iElement.addClass("alert-danger")
                        break;
                    case "ok":
                        iElement.addClass("alert");
                        iElement.addClass("alert-success")
                        break;
                    case "warning":
                        iElement.addClass("alert");
                        iElement.addClass("alert-warning")
                        break;
                    default:
                        break;
                }

            }
        
        }

        return directiveDefinitionObject;
    };
    

    
    function customerDirective($filter) {
        var directiveDefinitionObject = {
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {},
            controllerAs: 'ctrl',
            bindToController: {
                cust: "=",
            },
            
            // Esto de tener que definir un controlador vacío es feo. Buena oportunidad para
            // meter component. Aqui lo explica a la perfeccion: https://toddmotto.com/stateless-angular-components/
            controller: function() {},
            template: [
                "<div class='list-group-item'>",
                    "<div><strong>{{ctrl.cust.id}}.-{{ctrl.cust.name}}</strong></div>",
                    "<div>{{ctrl.cust.city | uppercase}} - Desde {{ctrl.cust.fecha_alta}} - Última factura:",
                    "{{ctrl.cust.ultima_factura | number:2}} €</div>",
                    "<div ng-transclude></div>",
                "</div>"
            ].join(''),
            link: function(scope, el, attrs, ctrl, transclude) {
                console.log(el);
            }
            
        };
        
        return directiveDefinitionObject;
    }
    
    
    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej10Controller(configData, customer) {
        
        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customer.getCustomers();
        vm.configuration = configData;
    }

})();