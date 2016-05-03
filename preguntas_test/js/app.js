function ServiceQuestions() {
    this.questions = [
        {
            id : 1,
            text:'¿Cómo declaramos en Java un atributo de una clase que solo pueda ser accedido desde la propia clase?',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Con "private"'},
                {id : 2, text : 'Con "public"'},
                {id : 3, text : 'Con mucho amor'},
                {id : 4, text : '¡Eso no se puede hacer!'}
            ]
        },
        {
            id : 2,
            text:'¿Qué significan las siglas del patron MVC?',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Modelo Vista Concurrente'},
                {id : 2, text : 'Modelo Vista Controlador'},
                {id : 3, text : 'Me Voy de Casa'}
            ]
        },
        {
            id : 3,
            text:'¿Quién ganaría en una pelea?',
            validAnswer : 4,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Goku'},
                {id : 2, text : 'Neo'},
                {id : 3, text : 'Supermán'},
                {id : 4, text : 'Chuck Norris'}
            ]
        }
    ];
    
    this.get = function() {
        return this.questions;
    }
    
    
}


function MiControlador($scope, ServiceQuestions) {
    $scope.correctAnswers = 0;
    
    $scope.questions = ServiceQuestions.get();
    
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

angular
    .module('encuesta', [])
    .service('ServiceQuestions', ServiceQuestions)
    .controller('MiControlador', ['$scope', 'ServiceQuestions', MiControlador])