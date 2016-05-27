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
        vm.formValid = true;


        vm.sendForm = function() {

            if (vm.miForm.name.$valid && vm.miForm.email.$valid && vm.miForm.date.$valid) {
                vm.formValid = true;
                clientsFactory.addClient({
                    name: vm.name,
                    email: vm.email,
                    signup_date: vm.date
                });

            }

            else {
                vm.formValid = false;
            }
        }
    }

})();
