var app = angular.module("app", []);

app.controller("MainCtrl", ['$scope', '$q', '$timeout',function($scope, $q, $timeout) {

    $scope.mensaje = "Esperando a que vengan los datos";
    

    function sumaAsincrona(a, b) {
      var defered = $q.defer();
      var promise = defered.promise;

      $timeout(function() {
        try {
          var resultado = a + b;
          defered.resolve(resultado);
        } catch (e) {
          defered.reject(e);
        }
      }, 3000);

      return promise;
    }

    var promise = sumaAsincrona(5, 2);

    promise.then(function(resultado) {
      $scope.mensaje = "5 + 2 = " + resultado;
    }, function(error) {
      $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
    });

}]);