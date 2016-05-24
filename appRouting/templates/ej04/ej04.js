// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    // Esta funcion es el controlador que asociamos a la vista del ej04
    function ej04Controller($scope) {
        
        var vm = this;

        vm.customers=[
                {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363}, 
                {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363}, 
                {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363}, 
                {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363}, 
                {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ];

        // Los controladores son destruidos cada vez que cambiamos de ruta, por eso no son un buen sitio para mantener
        // el estado de nuestra app (ej: items de un carrito de la compra)
        $scope.$on('$destroy', function(event, data) {
            console.log("Controlador destruido");
        })
    }
    
    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp')
        .controller('ej04Controller', ej04Controller);
})();
