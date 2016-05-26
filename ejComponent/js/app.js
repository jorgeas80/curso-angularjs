// Envolvemos el componente AngularJS en una IIFE, para eliminar las variables del scope global
(function() {

    // Usamos modo estricto (nuevo in ECMA5): http://www.w3schools.com/js/js_strict.asp
    'use strict';

    // Cargamos la aplicacion AngularJS
    angular
        .module('app', [])
        .directive('caPanel', caPanel)
        .directive('caTab', caTab);


    function caPanel() {
        var f = {};

        f.restrict = "E";
        f.templateUrl = "partials/panel.html";
        f.replace = true;
        f.transclude = true;
        f.scope = {
            title: "@"
        };
        /*
        f.controller = function($scope) {
            $scope.tabs = [
                {
                    content: "Contenido tab 1"
                },
                {
                    content: "Contenido tab 2"
                },
                
            ];

            $scope.addTab = function(content) {
                $scope.tabs.push({content: content});
            }
        };
        */

        return f;
    }

    function caTab() {
        var f = {};

        f.restrict = "E";
        f.replace = true;
        f.scope = {
            placeholder: "@"
        };
        f.templateUrl = "partials/tab.html";

        return f;
    }

})();