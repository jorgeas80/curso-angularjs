// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .controller('ej04Controller', ej04Controller);
    
    // Esta funcion es el controlador que asociamos a la vista del ej04
    function ej04Controller() {
        
        /** 
         * Gracias a la sintaxis "controller as", podemos usar 'this'. Se
         * explica bastante bien aquí: https://toddmotto.com/digging-into-angulars-controller-as-syntax/
         * 
         * Pero es mejor evitar el uso de 'this' porque es una palabra clave 
         * contextual (depende del contexto en el que se ejecute). Si lo usaramos 
         * en una funcion dentro de un controlador, podria cambiar su contexto
         * Aquí lo explica: http://www.johnpapa.net/angularjss-controller-as-and-the-vm-variable/
         * 
         * Ejemplo donde se ve el problema: http://stackoverflow.com/a/25405706/593722
         **/
        var vm = this;
        
        vm.customers=[
                {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363}, 
                {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363}, 
                {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363}, 
                {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363}, 
                {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ];    
    }
    
    
})();