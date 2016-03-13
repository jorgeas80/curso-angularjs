var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
    $scope.test = 'Salmonete';
    
    $scope.doSomething = function() {
        alert('Ya se habría mandado el formulario');
    }
});

app.directive('regexValidate', function() {
    return {
        // La directiva será de tipo atributo
        restrict: 'A',
        
        // El campo ngModel hace falta. Validamos campos del módelo, no elementos del DOM
        // OJO: Se escribe ngModel, aunque el campo sea [data-]ng-model
        require: 'ngModel',
        
        // scope = El scope padre
        // elem = La etiqueta HTML sobre la que creamos la directiva
        // attr = diccionario clave=valor con los atributos de la etiqueta
        // ctrl = este objeto nos da funciones para operar con el objeto del model.
        link: function(scope, elem, attr, ctrl) {
            
            // Obtenemos los flags para la expresion regular, si los hay
            var flags = attr.regexValidateFlags || '';
            
            // Creamos el objeto para la regex
            var regex = new RegExp(attr.regexValidate, flags);            
                        
            // $parsers es un array de funciones que se ejecutan
            // cada vez que se actualiza el objeto del modelo. 
            // Dichas funciones comprueban algo en el modelo, y si
            // la comprobación es exitosa, devuelven el objeto actualizado.
            // Si no lo es, devuelven undefined.
            // Vamos a añadir una función a este array que verifique si el objeto cumple
            // una propiedad (seguir el formato exigido por la expresión regular). 
            //
            // Resumen: Los $parsers actúan cuando hay un cambio desde la vista
            // hacia el modelo (ej: escribimos algo en un input asociado con un campo
            // del modelo por ng-model)
            ctrl.$parsers.unshift(function(value) {
                
                // Establecemos la propiedad "regexValidate" a true/false,
                // lo que sirve para establecer el campo [formName].[fieldName].$error.regexValidate
                // a true/false. Así es como permitimos que esta validación se pueda usar en el form.
                var valid = regex.test(value);
                ctrl.$setValidity('regexValidate', valid);
                
                // Devolvemos el objeto del modelo si se ha cumplido la expresión. Si no, 
                // devolvemos undefined.
                return valid ? value : undefined;
            });
            
            // Ya que hemos actuado sobre el modelo, vamos a actuar también
            // sobre la vista. $formatters es también un array de funciones.
            // Estas funciones se ejecutarán cada vez que un cambio en un campo
            // del modelo requiera que se renderice ese mismo campo en algún lugar
            // de la vista. De otra forma: Solo se actualizará el campo del DOM donde
            // aparezca el modelo tras un cambio en éste después de que todas estas
            // funciones se ejecuten.
            // 
            // Resumen: Los formatters actúan cuando hay un cambio desde la vista
            // hacia el modelo (ej: cambiamos programáticamente un campo del modelo
            // y queremos que se actualice la vista con el cambio). También se ejecutan
            // nada más cargar la página. Por eso, si quitamos esto, veremos que el aviso
            // en rojo no aparece al cargar la página, incluso cuando no se cumple la
            // expresión regular.
            ctrl.$formatters.unshift(function(value) {
                // validate.
                ctrl.$setValidity('regexValidate', regex.test(value));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });
        }
    };
});