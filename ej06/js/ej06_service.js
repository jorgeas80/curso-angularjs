// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
    
        // Valores que no vamos a cambiar en nuestra aplicación
        .constant('configData', {
            year: 2016,
            quarter: 'Q1'
        })
    
     /**
      * Servicio para obtener valores. Podríamos obtener los valores de un
      * tercero, haciendo una llamada http, por ej. También podríamos declararle
      * dependencias con $inject, como hacemos con el controlador
      **/
        .service('customerService', customerService)
    
        .controller('ej06Controller', ej06Controller);
        ej06Controller.$inject = ['configData', 'customerService'];
    
    // Esta función se usará para crear un service
    // Podríamos pasarle otros servicios como argumento
    function customerService() {
        this.customers = [
                {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363}, 
                {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363}, 
                {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363}, 
                {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363}, 
                {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ];
        
        // También podríamos definirnos el array "customers" fuera del objeto
        // var customers = [...]
        // Y luego simplemente devolverlo con un método getCustomers
        
        this.addCustomer = function(customer) {
            this.customers.push(customer);
        }
    }
    
    
    function ej06Controller(configData, customerService) {
        
        var vm = this;
        
        vm.customers = customerService.customers;
        vm.configuration = configData;
    }
    
})();