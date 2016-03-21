var app = angular.module("app", []);

// Esta es otra manera de especificar las dependencias para el inyector
app.controller("patternController", ['$scope',function($scope) {

  $scope.requeridoNombre=true;
  $scope.patternNombre=/^[a-zA-ZñÑ]*$/;

}]);