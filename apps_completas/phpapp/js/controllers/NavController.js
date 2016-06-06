// IIFE to avoid polluting global space
(function() {

    angular
        .module('app')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$location'];

    function NavCtrl($location) {

        // Capture this context here
        var vm = this;

        // Just to highlight the link in the navbar
        vm.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();