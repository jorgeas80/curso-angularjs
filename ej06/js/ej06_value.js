// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    // Esta funcion es el controlador que asociamos a la vista del ej04
    function ej06Controller($scope, configData, customerValue) {
        $scope.customers=customerValue.customers;
        
        $scope.configuration = configData;
    }
    
    // Cargamos la aplicacion AngularJS
    var app = angular.module('ejerciciosApp', []);
    
     // Valores que no vamos a cambiar en nuestra aplicación
    app.constant('configData', {
        year: 2016,
        quarter: 'Q1'
    });
    
    // Servicio para obtener valores. Es muy parecido a constant, con la 
    // diferencia de que value no se puede inyectar en un bloque config ni en un 
    // objeto de tipo provider, mientras que constant sí.
    // Por otro lado, ni constant ni value pueden acceder a servicios externos.
    // Si necesitamos algo así, es mejor usar un service/factory/provider
    app.value('customerValue', {
        customers: [
                {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363}, 
                {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363}, 
                {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363}, 
                {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363}, 
                {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ],
        addCustomer: function(customer) {
            customers.push(customer);
        }
    })
    
    app.controller('ej06Controller', ej06Controller);
    ej06Controller.$inject = ['$scope', 'configData', 'customerValue'];
    
})();