app.controller('FormCtrl', function($scope) {
    // $scope.master = {'title': 'Hello world', 'content': 'Lorem ipsum dolor sit amet.'};
    //$scope.master = {};

    $scope.update = function(post) {
        $scope.master = angular.copy(post);
    };

});