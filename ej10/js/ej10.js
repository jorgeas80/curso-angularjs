// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';


    // El provider es la base para el resto de servicios. La diferencia es que
    // provider permite ser configurado previamente a su instanciación.
    // Una vez configurado, provider provee lo que devuelva su método $get.
    // Básicamente, constant, value, service y factory son wrappers sobre
    // provider. Lo que devuelve el método $get de esos wrappers es la lógica
    // que nosotros creemos al definirlos.
    // Como el ciclo de vida de un provider empieza antes de iniciar la aplicación,
    // podemos pasar un provider como dependencia de un bloque config, o de
    // otro bloque provider. Una vez se arranque la aplicación Angular, el
    // provider expondrá su método $get como un factory.
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


    // Esta funcion es el controlador que asociamos a la vista del ej06
    function ej10Controller($scope, configData, customer) {

        // Aquí ya estamos usando el provider como si fuera un factory
        $scope.customers = customer.getCustomers();
        $scope.configuration = configData;
    }

    // Cargamos la aplicacion AngularJS
    var app = angular.module('ejerciciosApp', []);

    app.provider('customer', customerPvd);

    // Valores que no vamos a cambiar en nuestra aplicación
    app.constant('configData', {
        year: 2016,
        quarter: 'Q1'
    });

    // OJO: El segundo argumento es el nombre del provider ('customer') seguido 
    //de la cadena "Provider". AngularJS añade automáticamente el sufijo 
    // "Provider" detrás del nombre de todos los provider en el bloque config. 
    // Aquí lo confirma: http://stackoverflow.com/a/20881705/593722
    app.config(function(configData, customerProvider) {
        // Angular también tiene un servicio $log más completo que se podría usar
        console.log("DEBUG - Año: " + configData.year);
        console.log("DEBUG - Trimestre: " + configData.quarter); 

        // Podemos usar aquí el provider para configurarlo. Por lo demás,
        // funciona como un factory
        customerProvider.initCustomers();
    });

    // Así creamos la directiva. Básicamente, devolvemos un factory
    app.directive("yearlyData", function() {

        var directiveDefinitionObject = {
            restrict: "E",
            replace : true,

            // Aquí estamos pasandole a la directiva argumentos, para que 
            // pueda crear su propio scope a partir de elementos copiados
            // del scope padre. Además, estamos sincronizando los elementos
            template: "<span><p>{{text}}</p><ul><li><strong>Año: </strong> {{year}}</li><li><strong>Trimestre: </strong> {{quarter}}</li></ul></span>",

            scope: {
                year: "=",
                quarter: "=",
                text: "="
            }
        }

        return directiveDefinitionObject;
    });


    app.directive("caStatusServer",function() {

        var directiveDefinitionObject ={
            restrict:"E",
            replace : true,
            template:"<div>{{texto}}</div>",
            scope:{
                texto:"@"
            },
            
            // Vamos a manipular el DOM de la directiva para añadirle clases en función de un atributo
            link:function(scope, iElement, iAttrs, controller, transcludeFn) {

                switch (iAttrs.color) {
                    case "rojo":
                        iElement.addClass("alert");
                        iElement.addClass("alert-danger")
                        break;
                    case "verde":
                        iElement.addClass("alert");
                        iElement.addClass("alert-success")
                        break;
                    case "azul":
                        iElement.addClass("alert");
                        iElement.addClass("alert-info")
                        break;
                    default:
                        break;
                }

            }

        }

        return directiveDefinitionObject;
    });


    app.controller('ej10Controller', ej10Controller);
    ej10Controller.$inject = ['$scope', 'configData', 'customer'];

})();