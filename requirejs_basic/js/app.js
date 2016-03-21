require([
    'angular'
], function(angular) {
    var app = angular.module('app', []);
    
    app.controller('mainController', function ($scope) {
        $scope.message = 'Hola mundo';
    });
    
    angular.bootstrap(document, ['app']);
});