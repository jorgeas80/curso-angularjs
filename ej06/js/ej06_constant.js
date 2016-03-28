// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';
    
    /**
     * Cargamos la aplicacion AngularJS junto con sus dependencias.
     * También declaramos los servicios y controladores que vayamos a usar. 
     * Así podemos ver, lo primero de todo, lo que incluye nuestra aplicación.
     * No pasa nada por referenciar funciones antes de declararlas. El parseador
     * de Javascript hacer 'hoisting' automático de funciones, y las coloca
     * arriba del todo
     **/
    angular
        .module('ejerciciosApp', [])
        // Valores que no vamos a cambiar en nuestra aplicación
        .constant('configData', {
            year: 2016,
            quarter: 'Q1'
        })
    
        // Al controlador le pasamos el servicio constant creado
        .controller('ej06Controller', ej06Controller);
    
        ej06Controller.$inject = ['configData'];
    
    // Esta funcion es el controlador que asociamos a la vista del ej04
    function ej06Controller(configData) {
        
        /**
         * El uso de 'this' en lugar de $scope se considera buena práctica para
         * evitar el uso indiscriminado de $scope en los controladores.
         * Realmente, $scope solo se debería usar cuando publiquemos o nos
         * suscribamos a eventos ($on, $emit, $broadcast)
         *
         * Nos quedamos con el contexto de 'this', y en el resto de la función no
         * lo usamos. Aquí da lo mismo, pero si tuviéramos un closure dentro de
         * nuestro controlador, 'this' no significaría lo mismo dentro y fuera
         * del closure
         **/
        var vm = this;
        
        vm.customers=[
                {id: 1, name: 'Jorge Arévalo', city: 'Madrid', 'fecha_alta': '2014-07-12', 'ultima_factura': 1550.5485363}, 
                {id: 2, name: 'Elena Nieto del Bosque', city: 'Toledo', 'fecha_alta': '2010-01-23', 'ultima_factura': 1800.5435363}, 
                {id: 3, name: 'Javier Ucto', city: 'Murcia', 'fecha_alta': '2015-12-02', 'ultima_factura': 2100.5435363}, 
                {id: 4, name: 'Jose Villanas', city: 'Córdoba', 'fecha_alta': '2006-04-15', 'ultima_factura': 988.5435363}, 
                {id: 5, name: 'Marta Burete', city: 'Gijón', 'fecha_alta': '2009-08-15', 'ultima_factura': 1250.5435363}
        ];
        
        // Aquí estamos usando el servicio constant creado
        vm.configuration = configData;
    }
    
    
})();