(function() {
    angular
        .module("app", [])
        .factory('MyFactory', MyFactory)
        .controller("MainCtrl", MainCtrl);

    MyFactory.$inject = ['$q', '$timeout'];
    MainCtrl.$inject = ['MyFactory'];

    // Resolvemos la operación en un servicio. El controlador debe tener poco código.
    function MyFactory($q, $timeout) {
        var f = {};

        f.sumaAsincrona = function(a, b) {
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
        };

        return f;
    }

    function MainCtrl(MyFactory) {
        
        var vm = this;
        
        vm.obj = {
            mensaje: "Esperando a que vengan los datos"
        };

        // La promesa la resuelve el factory, y nosotros
        MyFactory
            .sumaAsincrona(5, 2)
            .then(function(resultado) {
                vm.obj.mensaje = "5 + 2 = " + resultado;
            }, function(error) {
                vm.obj.mensaje = "Se ha producido un error al obtener el dato:" + error;
            });
    }

})();

