var app = angular.module("app", []);

app.controller("MainCtrl", ['$scope', '$http', '$q', '$timeout',function($scope, $http, $q, $timeout) {

    $scope.mensaje = "Esperando a que vengan los datos";


    function httpAsincrona() {
        var defered = $q.defer();
        var promise = defered.promise;

        var config={
            method:"GET",
            url:"http://jsonplaceholder.typicode.com/posts/1"
        }

        var response=$http(config);

        response.success(function(data, status, headers, config) {
            var resultado = angular.fromJson(data);
            defered.resolve(resultado);
        });

        response.error(function(data, status, headers, config) {
            console.log("Ha fallado la petición. Estado HTTP:"+status);
            defered.reject(data);
        });

        return promise;
    }


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

    //var promise = sumaAsincrona(5, 2);
    var promise = httpAsincrona();

    promise.then(function(resultado) {
        $scope.mensaje = "Resultado: " + resultado;
    }, function(error) {
        $scope.mensaje = "Se ha producido un error al obtener el dato:" + error;
    });

}]);