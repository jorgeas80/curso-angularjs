// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    // Definimos arriba la variable vacia porque la vamos a referenciar ahora. Al final del
    // fichero se le asigna un valor
    var customerComponent = {};
    
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .constant('configData', {
            year: 2016,
            quarter: 'Q1'
        })

        .factory('customerFactory', customerFactory)

        .directive("caYearlyData", yearlyDataDirective)
        .directive("caStatusServer", statusServerDirective)
        .directive("caStatusServer2", statusServerDirective2)
        .directive("caStatusServer3", statusServerDirective3)
    
        .directive("caCustomer", customerDirective)
        
        // Comentar la línea de arriba y descomentar esta para ver como se define un component
        //.component("caCustomer", customerComponent)
        .controller('ej10Controller', ej10Controller);
   
    ej10Controller.$inject = ['configData', 'customerFactory'];



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
    

    // Aquí definimos la directiva como un "stateless object". Es una idea que también usa react
    // Nuestra directiva va a ser un objeto aislado al que le pasamos datos para que los
    // renderice. De manera que la directiva tendrá su propio controlador y su propio scope aislado. Además, usaremos
    // la sintáxis ControllerAs
    function customerDirective() {
        var directiveDefinitionObject = {
            restrict: "E",
            replace: true,
            transclude: true,

            /**
             * controllerAs y bindToController van siempre juntos, y están relacionados con el scope. Un poco de historia...
             *
             * AngularJS 1.2:
             *  No se podía usar controllerAs con un scope aislado y el 2way data binding, porque las variables definidas
             *  en el scope de la directiva no se enlazaban con el controlador, sino con el $scope:
             *
             *  app.directive('MiDirectiva', function() {
             *      return {
             *          scope: {
             *              name: '='
             *          },
             *          controllerAs: 'ctrl',
             *          template: '<div>{{ctrl.name}}</div>',
             *          controller: function($scope) {
             *              this.name = 'Pepe';
             *
             *              // Hay que hacer esto para que 'this' capture el cambio de variable... No nos hemos
             *              // librado de $scope...
             *              $scope.$watch('name', function (newValue) {
             *                  this.name = newValue;
             *              }.bind(this));
             *          }
             *      };
             *    });
             *
             *  AngularJS 1.3:
             *   Introdujo la palabra clave 'bindToController'. Si valía true, hacía que las variables del scope de la
             *   directiva se enlazaran con el controlador, no con el scope en si.
             *
             *   app.directive('MiDirectiva', function() {
             *      return {
             *          scope: {
             *              name: '='
             *          },
             *          bindToController: true,
             *          controllerAs: 'ctrl',
             *          template: '<div>{{ctrl.name}}</div>',
             *          controller: function() {
             *              this.name = 'Pepe';
             *          }
             *      };
             *    });
             *
             *  AngularJS 1.4:
             *   Amplió 'bindToController'. Ahora también aceptaba directamente un json con las variables a vincular al
             *   controlador. En ese caso, bastaba con definir scope como un json vacío, simplemente para dejar claro
             *   que la directiva tenía un scope aislado
             *
             *   app.directive('MiDirectiva', function() {
             *      return {
             *          scope: {
             *          },
             *          bindToController: {
             *              name: "="
             *          }
             *          controllerAs: 'ctrl',
             *          template: '<div>{{ctrl.name}}</div>',
             *          controller: function() {
             *              this.name = 'Pepe';
             *          }
             *      };
             *    });
             *
             *  AngularJS 1.5:
             *    La sintáxis de la directiva había quedado demasiado verbosa. De hecho, aunque nuestra directiva no
             *    necesitara un controlador específico (realmente solo hacen falta para exponer funciones a otras
             *    directivas), había que declararlo vacío. Y había que declarar el scope como un json vacío también.
             *
             *    app.directive('MiDirectiva', function() {
             *      return {
             *          scope: {    // scope vacío
             *          },
             *          bindToController: {
             *              name: "="
             *          }
             *          controllerAs: 'ctrl',
             *          template: '<div>{{ctrl.name}}</div>',
             *          controller: angular.noop,   // no hace falta controlador, pero aun así hay que declararlo...
             *      };
             *    });
             *
             *    Para simplificar esto, se creó la función component (ojo al uso de $ctrl en la plantilla)
             *
             *    app.component('MiComponente', function() {
             *      return {
             *          bindings: {
             *              name: "="
             *          }
             *          template: '<div>{{$ctrl.name}}</div>',
             *      };
             *    });
             */

            // Esto es solo para especificar que nuestra directiva creará un scope aislado. La definición de bindToController
            // abajo ya genera una serie de variables que irán directamente unidas al controlador. De hecho, si tanto
            // scope como bindToController son definidos como objetos json, bindToController toma preferencia.
            // Si aquí pusiera scope: true, también funcionaría. Simplemente, estaría heredando el scope del padre, en
            // lugar de crear uno nuevo, pero el enganche de 'name' con el controlador sería igual
            scope: {
                cust: "=",
            },

            // Esto nos permite usar el alias 'ctrl' en la plantilla.
            controllerAs: 'ctrl',

            // Las variables definidas aquí, se engancharán con el controlador directamente. Se usa conjuntamente con
            // controllerAs (arriba).
            bindToController: {
                cust: "=",
            },


            // Cuando usamos ControllerAs, tenemos que definir un controlador, aunque sea vacío. Como esto es feo,
            // podemos usar la función component, añadida en angular 1.5.0: https://toddmotto.com/stateless-angular-components/
            controller: function() {},
            //controller: angular.noop,


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
    
    // Esta es la alternativa a la sintáxis verbosa de controller as (ver customerDirective)
    // para obtener un stateless object mediante una directiva (scope aislado, su propio
    // controlador al que pasarle datos)
    customerComponent = {
        
        // scope y bindToController se transforman en bindings
        bindings: {
            cust: "="
        },
        
        // controller y controllerAs se simplifican y por defecto podemos usar $ctrl 
        // dentro de nuestra template, sin necesidad de declarar nada más
        template: [
                "<div class='list-group-item'>",
                    "<div><strong>{{$ctrl.cust.id}}.-{{$ctrl.cust.name}}</strong></div>",
                    "<div>{{$ctrl.cust.city | uppercase}} - Desde {{$ctrl.cust.fecha_alta}} - Última factura:",
                    "{{$ctrl.cust.ultima_factura | number:2}} €</div>",
                    "<div ng-transclude></div>",
                "</div>"
            ].join(''),
    };
    
    
    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej10Controller(configData, customerFactory) {
        
        var vm = this;

        // Aquí ya estamos usando el provider como si fuera un factory
        vm.customers = customerFactory.getCustomers();
        vm.configuration = configData;
    }

})();