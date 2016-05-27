// IIFE to avoid polluting global space
(function() {

    angular
        .module('app')
        .controller('GetClientsCtrl', GetClientsCtrl);

    GetClientsCtrl.$inject = ['clientsFactory'];

    function GetClientsCtrl(clientsFactory) {

        // Capture this context here
        var vm = this;

        // getClients already returns the data, not a promise
        vm.clients = clientsFactory.getClients();
    }
})();