(function() {

    angular
        .module("app", [])
        .controller("MainCtrl", MainCtrl);

    MainCtrl.$inject = ['$http', '$q', '$timeout'];

    function MainCtrl($http, $q, $timeout) {
        
        var vm = this;
        
        vm.obj = {
            mensaje: "Esperando a que vengan los datos"
        };


        function httpAsincrona() {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http
                .get("http://jsonplaceholder.typicode.com/posts/1")
                .then(
                    function successCallback(response) {
                        var resultado = angular.toJson(response);
                        defered.resolve(resultado);
                    },
                
                    function errorCallback(response) {
                        console.log('Error al obtener los datos: ' + response);
                        defered.reject(response);
                    }
                );
            
            return promise;
            
            /*
            var config={
                method:"GET",
                url:"http://jsonplaceholder.typicode.com/posts/1"
            }

            var response=$http(config);

            response.success(function(data, status, headers, config) {
                var resultado = angular.toJson(data);
                defered.resolve(resultado);
            });

            response.error(function(data, status, headers, config) {
                console.log("Ha fallado la petición. Estado HTTP:"+status);
                defered.reject(data);
            });

            return promise;
            */
        }


        
        var promise = httpAsincrona();

        promise.then(function(resultado) {
            vm.obj.mensaje = "Resultado: " + resultado;
        }, function(error) {
            vm.obj.mensaje = "Se ha producido un error al obtener el dato:" + error;
        });
    }

})();
