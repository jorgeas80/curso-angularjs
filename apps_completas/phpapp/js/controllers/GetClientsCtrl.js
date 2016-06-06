// IIFE to avoid polluting global space
(function() {

    angular
        .module('app')
        .controller('GetClientsCtrl', GetClientsCtrl);

    GetClientsCtrl.$inject = ['clientsFactory'];

    function GetClientsCtrl(clientsFactory) {

        // Capture this context here
        var vm = this;

        // getClients uses $resource. It handles the promises and allows us to get a resolved object to be shown
        vm.clients = clientsFactory.getClients();
    }
})();