angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('AlertDemoCtrl', function ($scope) {
  $scope.alerts = [
    { type: 'danger', msg: 'No ha podido realizarse la operación' },
    { type: 'success', msg: 'Operación realizada con éxito' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: '¡Alerta!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});