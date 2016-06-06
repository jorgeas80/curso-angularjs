(function() {

    angular
        .module('app')
        .controller('AddClientCtrl', AddClientCtrl);

    AddClientCtrl.$inject = ['clientsFactory'];

    function AddClientCtrl(clientsFactory) {

        // Capture this context here
        var vm = this;

        // As we're using Controller As syntax, we don't need to worry about prototypical inheritance (can use primitive types directly in our controller)
        vm.name = "";
        vm.email = "";
        vm.date = "";
        vm.resultClasses = '';
        vm.showResp = false;
        vm.message = '';


        vm.sendForm = function() {

            if (vm.miForm.name.$valid && vm.miForm.email.$valid && vm.miForm.date.$valid) {
                vm.formValid = true;
                clientsFactory

                    // This sends a HTTP POST request by calling $resource
                    .addClient({
                        name: vm.name,
                        email: vm.email,
                        signup_date: vm.date
                    })

                    // We can handle the $resource promise by ourselves.
                    .then(

                        // Response ok
                        function(resp) {
                            vm.showResp = true;
                            vm.resultClasses = "alert alert-success";
                            vm.message = "Cliente añadido correctamente"
                        },

                        // Response error
                        function(error) {
                            vm.showResp = true;
                            vm.resultClasses = "alert alert-danger";
                            vm.message = "Error añadiendo cliente: " + error;
                        })

                    // Always execute this
                    .finally(function() {
                        vm.name = "";
                        vm.email = "";
                        vm.date = "";
                    });

            }
        }
    }

})();
