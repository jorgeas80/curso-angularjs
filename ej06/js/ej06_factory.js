// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    
    // Aquí usamos la función anterior para crear un factory. Las diferencias
    // entre factory y service son tan sutiles que realmente es más una cuestión
    // de elección personal
    function customerFactory() {
        var f = {};
        
        // Aquí estamos ocultando el objeto customers (no lo vamos a devolver).
        // De esta forma, estamos de alguna manera definiendo atributos "privados"
        // Con los service se puede conseguir también, pero esta manera es más clara en cuanto a sintáxis
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
    
    
    // Esta funcion es el controlador que asociamos a la vista del ej04
    function ej06Controller($scope, configData, customerFactory) {
        $scope.customers = customerFactory.getCustomers();
        $scope.configuration = configData;
    }
    
    // Cargamos la aplicacion AngularJS
    var app = angular.module('ejerciciosApp', []);
    
     // Valores que no vamos a cambiar en nuestra aplicación
    app.constant('configData', {
        year: 2016,
        quarter: 'Q1'
    });
    
    // Servicio para obtener valores. Podríamos obtener los valores de un
    // tercero, haciendo una llamada http, por ej. También podríamos declararle
    // dependencias con $inject, como hacemos con el controlador
    app.factory('customerFactory', customerFactory);
    
    app.controller('ej06Controller', ej06Controller);
    ej06Controller.$inject = ['$scope', 'configData', 'customerFactory'];
    
})();