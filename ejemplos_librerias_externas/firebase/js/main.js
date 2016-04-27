// Creamos modulo myApp, con una dependencia: firebase
var myApp = angular.module("firebaseApp", ["firebase"]);

// Creamos controlador FirebaseController con dos dependencias: $scope y $firebaseArray. Implementara un cliente basico de chat
// Lo que haremos sera mandar mensajes a firebase, e iran apareciendo en pantalla, simplemente
myApp.controller("FirebaseController", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
    
    // Creamos variable para almacenar la url a una instancia de prueba de Firebase. Si falla, habrá que crear una
    // Podemos usar esta:
    //var ref = new Firebase("https://blistering-fire-2438.firebaseio.com/");
    var ref = new Firebase("https://https://cursoangularjs.firebaseio.com//");
    
    // Si falla, se puede usar esta de demo
    //var ref = new Firebase("https://c79l3jds2ao.firebaseio-demo.com/");

    // Llamamos a $firebaseArray pasandole la instancia de Firebase creada y almacenamos el resultado en el campo messages del scope
    $scope.messages = $firebaseArray(ref);
    
    // Creamos una variable msg en el scope para mandarle mensajes
    $scope.msg = "";
    
    // Creamos una variable name en el scope para almacenar nuestro nick de usuario. Le damos un valor por defecto,
    // que aparecera si el usuario no mete un nick
    $scope.name = "Pobrecito hablador";

    // Añadimos tambien al scope una funcion addMessage que recibe un argumento (la tecla pulsada)
    $scope.addMessage = function(e) {

        //Si la tecla pulsada es ENTER (keycode === 13) y msg tiene algo...
        if (e.keyCode === 13 && $scope.msg) {
            

            // Mandamos el mensaje a Firebase, mediante $scope.messages.add(...).
            // El unico argumento de esta funcion sera un json con dos campos
            // from: el nombre de quien manda el mensaje
            // body: el mensaje a mandar
            $scope.messages.$add({
                from: $scope.name,
                body: $scope.msg
            });

            // Limpiamos el mensaje
            $scope.msg = "";
        }
    }
}]);