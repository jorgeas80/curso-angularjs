(function() {
    angular
        .module("app", [])
        .controller("MainCtrl", MainCtrl);

    MainCtrl.$inject = ['$q', '$timeout'];
    

    function MainCtrl($q, $timeout) {
        
        var vm = this;
        
        vm.obj = {
            mensaje: "Esperando a que vengan los datos"
        };


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
            vm.obj.mensaje = "5 + 2 = " + resultado;
        }, function(error) {
            vm.obj.mensaje = "Se ha producido un error al obtener el dato:" + error;
        });
    }

})();

