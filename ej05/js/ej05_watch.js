// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {
    'use strict';

    // Esta funcion es el controlador que asociamos a la vista del ej05
    function ej05Controller($scope) {

        //////////////////////////////////////////////////////
        // Uso basico de $watch para monitorizar una variable
        $scope.obj = {};
        $scope.obj.nombre="Pepe"

        $scope.$watch("obj.nombre",function(newValue,oldValue) {

            if (newValue===oldValue) {
                return;
            }

            alert("El nuevo Nombre es:" + newValue);
        }, true); // Pasando true, forzamos a utilizar angular.equals en lugar de !==, que solo funciona bien con escalares (números, texto)

        $scope.change=function() {
            $scope.obj.nombre="Antonio"
        }

        //////////////////////////////////////////////////////
        // Uso básico de $watch monitorizando una expresión
        $scope.persona = {
            nombre: "Paco",
            apel: "Perez"
        }

        $scope.$watch("getNombreCompleto()", function(newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            
            console.log(typeof oldValue);
            console.log(typeof newValue);

            alert("El valor ha cambiado: " + newValue);
        });

        $scope.getNombreCompleto=function() {
            return $scope.persona.nombre + " " + $scope.persona.apel
        }

        $scope.change2 = function() {
            $scope.persona.nombre="Juan";
        }

        //////////////////////////////////////////////////////
        // Uso de $watchCollection
        $scope.provincias = [{
            idProvincia: 1,
            nombre: "Valencia"
        }, {
            idProvincia: 2,
            nombre: "Castellón"
        }, {
            idProvincia: 3,
            nombre: "Alicante"
        }];

        $scope.$watchCollection('provincias', function(newCollection, oldCollection) {

            if (newCollection === oldCollection) {
                return;
            }

            alert("El nuevo valor es:" + angular.toJson(newCollection));
        });



        $scope.change3 = function() {
            $scope.provincias.pop();
        };

        $scope.change4 = function() {
            $scope.provincias[0] = {
                idProvincia: 17,
                nombre: "Toledo"
            }
        };


        //////////////////////////////////////////////////////
        // Uso de $watchGroup
        $scope.persona2 = {
            nombre: "Jorge",
            apellido: "Lopez"
        }

        $scope.$watchGroup(['persona2.nombre','persona2.apellido'], function(newValues, oldValues) {
            if (newValues === oldValues) {
                return;
            }

            alert("Nuevo nombre:" + newValues[0]  + " y nuevo apellido:" + newValues[1]);
        });

        $scope.change5 = function() {
            $scope.persona2.nombre="Raul";
        }

        $scope.change6 = function() {
            $scope.persona2.apellido="Perez";
        } 



    }

    // Cargamos la aplicacion AngularJS
    angular
        .module('ejerciciosApp', [])
        .controller('ej05Controller', ej05Controller);

    ej05Controller.$inject = ['$scope'];

})();