(function() {

    angular
        .module('myApp', [])
        .controller('SimpleController', SimpleController);

    function SimpleController() {
        
        var vm = this;
        
        vm.x = 3;
        vm.y = 4;
        vm.doubleIt = function () {
            vm.x *= 2;
            vm.y *= 2;
        };
    }

})();
