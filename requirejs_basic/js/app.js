require([
    'angular'
], function(angular) {
    angular
        .module('app', [])
            .controller('mainController', function ($scope) {
            $scope.message = 'Hola mundo';
        });
    
    angular.bootstrap(document, ['app']);
});