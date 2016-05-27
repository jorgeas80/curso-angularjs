(function() {

    angular
        .module('app')
        .constant('baseUrl', 'http://146.185.177.85/api.php/clients/:id')
        .factory('clientsFactory', clientsFactory);

    clientsFactory.$inject = ['$resource', 'baseUrl'];
    
    
    function clientsFactory($resource, baseUrl) {
        
        var f = {};

        // Create object to handle resources
        f.clientResource = $resource(baseUrl);

        // We could cache the clients in this method...
        f.getClients = function() {
            return f.clientResource.query();
        };

        // We could cache one client here
        f.getClient = function(clientId) {
            return f.clientResource.get({id: clientId});
        }

        // Add new client
        f.addClient = function(data) {
            var client = new f.clientResource(data);
            client.$save();

            // Update clients
            f.getClients();
        }
        
        return f;
        
    }
    
    
})();