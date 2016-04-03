(function() {
    angular
        .module('myApp', [])
        .controller('MainCtrl', MainCtrl)
        .factory('someService', SomeService);

    MainCtrl.$inject = ['$scope', 'someService'];
    SomeService.$inject = ['$timeout', '$q'];

    
    /* Set up a simple controller with a few 
     * examples of common actions a controller function
     * might set up on a $scope. */
    function MainCtrl($scope, someService) {
        
        var vm = this;
        
        //set some properties
        vm.foo = 'foo';
        vm.bar = 'bar';


        //add a simple function.
        vm.test1 = function (){
            vm.foo = vm.foo + '!!!';
        };

        //set up a $watch.
        // ESTO NO VA A FUNCIONAR.
        // AQUI LO EXPLICA: http://stackoverflow.com/a/24078893/593722
        // AQUÍ TAMBIÉN: https://toddmotto.com/digging-into-angulars-controller-as-syntax/
        /*
        $scope.$watch('vm.bar', function (v){
            vm.baz = v + 'baz';
        });
        **/
        
        //set up a $watch.
        // ASI SI FUNCIONA (SACADO DEL ENLACE ANTERIOR)
        $scope.$watch(angular.bind(vm, function() { return vm.bar}), function(v) {
          vm.baz = v + 'baz';
        });
        
        

        //make a call to an injected service.
        vm.test2 = function (){
            //an async call returning a promise that
            //inevitably returns a value to a property.
            someService.someAsyncCall(vm.foo)
                .then(function(data) {
                    vm.fizz = data;
                });
        };
    }
    
    /* Simple service example. 
     * This is a service created just to use as an example of
     * some simple service that is making some asynchronous call.
     * A real-life example of something like this would be a 
     * service that is making $http or $resource calls, perhaps. */
    function SomeService($timeout, $q) {
        return {

            // simple method to do something asynchronously.
            someAsyncCall: function (x){
                var deferred = $q.defer();
                $timeout(function (){
                    deferred.resolve(x + '_async');
                }, 100);
                return deferred.promise;
            }
        };
    }
    
})();


