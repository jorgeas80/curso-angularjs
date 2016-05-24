(function() {

    angular
        .module("app", [])
        .constant('urlDatos', "http://jsonplaceholder.typicode.com/posts/1")
        .factory('MyFactory', MyFactory)
        .controller("MainCtrl", MainCtrl);

    MyFactory.$inject = ['$q', '$http', 'urlDatos'];
    MainCtrl.$inject = ['MyFactory'];

    // Resolvemos la operación en un servicio. El controlador debe tener poco código.
    function MyFactory($q, $http, urlDatos) {
        var f = {};

        // Aquí estamos manteniendo el estado en el propio modelo de datos (nuestro factory).
        // Como los servicios son Singleton, se mantienen a lo largo de toda la vida de la app. Los controladores se
        // están creando y destruyendo constantemente (ej: cada vez que cambiamos de ruta en una app con rutas)
        // Controversia: Singleton which aren't stateless are evil!
        f.mensaje = "Esperando a que vengan los datos";

        f.getData = function() {
            var defered = $q.defer();
            var promise = defered.promise;

            var resultado;

            $http
                .get(urlDatos)
                .then(
                    function successCallback(response) {
                        f.mensaje = angular.toJson(response);
                        defered.resolve(f.mensaje);
                    },

                    function errorCallback(response) {
                        f.mensaje = "Error obteniendo datos";
                        defered.reject(f.mensaje);
                    }
                );

            return promise;

        };

        return f;
    }



    function MainCtrl(MyFactory) {
        
        var vm = this;
        
        vm.obj = {
            // El estado lo mantiene el factory, el controlador simplemente habla con él
            mensaje: MyFactory.mensaje

            // La alternativa sería esto (comentado). Aquí el estado se mantendría en el controlador.
            //mensaje: "Esperando a que vengan los datos"
        };

        MyFactory
            .getData()
            .then(
                function successCallback() {

                    // Una vez más, mantenemos el estado en el servicio (nuestro modelo de datos), y el controlador solo actualiza cuando le toca
                    vm.obj.mensaje = MyFactory.mensaje;

                    // La alternativa sería ésta (comentado, requiere el argumento 'response'). Estaríamos manteniendo el estado en el controlador.
                    //vm.obj.mensaje = response;
                },

                function errorCallback() {
                    vm.obj.mensaje = MyFactory.mensaje;
                }
            );

    };

})();
