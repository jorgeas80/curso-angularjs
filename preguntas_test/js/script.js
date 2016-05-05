function TestController($scope) {
    $scope.questions = [
        {
            id : 1,
            text:'¿Tiene sentido usar AngularJS con jQuery?',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Se puede pero no es necesario. AngularJS hace que manipular el DOM, en general, no sea una buena idea'},
                {id : 2, text : 'Sí, es recomendable usarlos juntos'},
                {id : 3, text : 'No, AngularJS no puede funcionar con jQuery'},
            ]
        },
        {
            id : 2,
            text:'El concepto data binding en AngularJS implica que',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Ese concepto no se maneja en AngularJS'},
                {id : 2, text : 'Modelo y vista quedan enlazados mediante el $scope'},
                {id : 3, text : 'Podemos hacer que vista y modelo queden enlazados, pero tendremos que actualizar la vista a mano'}
            ]
        },
        {
            id : 3,
            text:'¿Hay alguna diferencia entre ng-show y ng-if?',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'No, hacen lo mismo'},
                {id : 2, text : 'ng-show solo se puede usar si incluimos un plugin externo a AngularJS'},
                {id : 3, text : 'ng-show oculta un elemento del DOM, mientras que ng-if lo elimina'},
            ]
        },
        {
            id : 4,
            text:'¿Cuántos tipos de servicios hay en AngularJS?',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Solo 1: service'},
                {id : 2, text : 'Hay 5: constant, value, service, factory y provider'},
                {id : 3, text : 'Hay 2: service y factory'},
            ]
        },
        {
            id : 5,
            text:'Nombra dos herramientas para hacer routing en AngularJS',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'ngRoute y UI route'},
                {id : 2, text : 'ngRoute y AngularJSRouting'},
                {id : 3, text : 'Solo existe ngRoute'},
            ]
        },
        {
            id : 6,
            text:'La opción track by de ngRepeat',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'No existe'},
                {id : 2, text : 'Solo se puede usar con arrays de cadenas'},
                {id : 3, text : 'Asocia un elemento del DOM con un elemento del array a recorrer'},
            ]
        },
        {
            id : 7,
            text:'Para escribir tests en AngularJS usamos',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'AngularJSTest'},
                {id : 2, text : 'Jasmine'},
                {id : 3, text : 'UITesting'},
            ]
        },
        {
            id : 8,
            text:'Cuales son los tipos de tests que podemos ejecutar en AngularJS',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Tests unitarios solamente'},
                {id : 2, text : 'Tests unitarios y tests E2E'},
                {id : 3, text : 'Tests unitarios y tests de velocidad'},
            ]
        },
        {
            id : 9,
            text:'Si queremos filtrar una lista de elementos en función de una entrada de usuario en un formulario, usamos el filtro',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'UserInputFilter'},
                {id : 2, text : 'TextFilter'},
                {id : 3, text : 'filter'},
            ]
        },
        {
            id : 10,
            text:'Se considera una buena práctica:',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Trabajar con objetos en vez de variables sueltas en el $scope, para evitar problemas en $scope heredados'},
                {id : 2, text : 'Escribir todas las variables en mayúsculas'},
                {id : 3, text : 'Manipular el DOM directamente desde un controlador'},
            ]
        },
        {
            id : 11,
            text:'¿Cuándo se considera aceptable manipular el DOM en AngularJS?',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Nunca. Desde AngularJS no se permite manipular el DOM'},
                {id : 2, text : 'Desde la función link del objeto que implementa una directiva en AngularJS (también llamada función de post-enlazado)'},
                {id : 3, text : 'Desde un controlador'},
            ]
        },
        {
            id : 12,
            text:'El concepto transclusion en AngularJS:',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'No existe.'},
                {id : 2, text : 'Define la manera en la que se inyectan dependencias de manera automática'},
                {id : 3, text : 'Define el proceso de insertar un elemento del DOM en un punto dado, marcado mediante ng-transclude'},
            ]
        },
        {
            id : 13,
            text:'¿Cuál es el componente más importante de AngularJS 1.x, en el sentido de que se mantiene en Angular 2 y tiene importancia en el estado actual del desarrollo frontend?',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Las directivas, que son la base para implementar el paradigma de web components en Angular 2'},
                {id : 2, text : 'Los controladores'},
                {id : 3, text : 'El scope'},
            ]
        },
        {
            id : 14,
            text:'Con respecto a la validación de formularios en AngularJS',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'No se añade nada nuevo. La validación se puede implementar mediante HTML5 o Javascript nativo'},
                {id : 2, text : 'Existen facilidades para verificar si el usuario ha introducido o no datos y algunas validaciones ya implementadas (email, max-length, etc)'},
                {id : 3, text : 'Utiliza jQuery para las validaciones'},
            ]
        },
        {
            id : 15,
            text:'Cuando yo valido un campo de formulario desde AngularJS:',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Valido realmente el campo del modelo vinculado con el elemento del formulario'},
                {id : 2, text : 'Valido el elemento del DOM que ha cambiado y tengo que trasladar manualmente ese cambio al modelo'},
                {id : 3, text : 'Ninguna de las respuestas anteriores es correcta'},
            ]
        },
        {
            id : 16,
            text:'Si quiero implementar mis propias validaciones de formularios en AngularJS:',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Debo implementar un objeto de tipo filter y aplicarlo sobre el campo que yo quiera validar'},
                {id : 2, text : 'Tengo que utilizar una librería externa, porque AngularJS por si mismo no me lo permite'},
                {id : 3, text : 'Debo aprovechar los arrays $parsers y $formatters dentro de la función link para añadir mis funciones de validación. Estos arrays controlan cómo los cambios del modelo se muestran en la vista y viceversa.'},
            ]
        },
        {
            id : 17,
            text:'Con respecto a las promesas en AngularJS',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Algunos servicios de AngularJS, como $http, devuelven promesas, y debo implementar la función de callback que será llamada cuando la promesa se resuelva'},
                {id : 2, text : 'AngularJS proporciona el servicio $q, que me permite manejar manualmente el mecanismo de creación de la promesa y su resolución.'},
                {id : 3, text : 'Las dos respuestas anteriores son correctas.'},
            ]
        },
        {
            id : 18,
            text:'La comunicación entre componentes en AngularJS:',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Se basa en compartir objetos declarados globalmente.'},
                {id : 2, text : 'Se puede hacer mediante servicios que añadan/obtengan los elementos a compartir y que sean inyectados en los lugares donde se necesiten.'},
                {id : 3, text : 'Utiliza una base de datos MongoDB embebida en el navegador a la que todos los componentes pueden acceder.'},
            ]
        },
        {
            id : 19,
            text:'Sobre las pruebas unitarias en AngularJS con Jasmine:',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Podemos crear mocks de objetos e inyectarlos en nuestros tests. Así no es necesario que hagamos las llamadas reales, que pueden ser muy pesadas.'},
                {id : 2, text : 'Jasmine proporciona objetos especiales rastreables, que nos dicen si alguno de sus métodos ha sido llamado, con cuántos argumentos, etc'},
                {id : 3, text : 'Las dos respuestas anteriores son válidas.'},
            ]
        },
        {
            id : 20,
            text:'Con respecto a la carga asíncrona de ficheros en una aplicación AngularJS:',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Puedo usar tanto el patrón AMD, que carga los ficheros de manera asíncrona bajo petición, como el patrón CommonJS, que exporta los ficheros como dependencias y permite cargarlos de manera síncrona.'},
                {id : 2, text : 'Solo puedo usar el patrón AMD, cuya implementación más popular es require.js.'},
                {id : 3, text : 'Solo puedo usar el patrón CommonJS, cuya implementación más popular es browserify.'},
            ]
        },
        {
            id : 21,
            text:'Si quiero automatizar ciertas tareas de mi aplicación AngularJS, como minificación, testing, etc:',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Tengo que utilizar herramientas de Java, como maven.'},
                {id : 2, text : 'Hay muchas herramientas disponibles, pero las más comunmente aceptadas son npm y gulp'},
                {id : 3, text : 'Solo puedo usar grunt y bower.'},
            ]
        },
    ];

    $scope.userStatus = '';

    $scope.validAnswers = 0;

    $scope.validate = function (question) {
        if (question.validAnswer == question.userAnswer) {
            $scope.validAnswers ++;
            question.status = 'ok';
        } else {
            if (question.status == 'ok' && $scope.validAnswers > 0) {
                $scope.validAnswers --;
            }
            question.status = 'error';
        }

        updateUserStatus();
    };

    function updateUserStatus() {
        var avgValidAnswers = ($scope.validAnswers / $scope.questions.length) * 100;
        if (avgValidAnswers == 0) {
            $scope.userStatus = 'looser';
        } else if (avgValidAnswers == 100) {
            $scope.userStatus = 'guru';
        } else {
            $scope.userStatus = 'poor';
        }
    }

}
