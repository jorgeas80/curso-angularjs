(function() {

    angular
        .module('app', [])
        .directive('tab', tab)
        .directive('tabs', tabs);

    function tab() {

        var f = {};

        f.restrict = 'E';
        f.scope = {
            label: '@'
        };
        f.require = '^tabs';
        f.transclude = true;
        f.templateUrl = "partials/tab.html";
        f.link = function ($scope, $element, $attrs, $ctrl) {
            $scope.tab = {
                label: $scope.label,
                selected: false
            };
            $ctrl.addTab($scope.tab);
        };

        return f;
    }

    function tabs() {

        var f = {};

        f.restrict = 'E';
        f.scope = {};
        f.transclude = true;
        f.controller = function () {
            this.tabs = [];
            this.addTab = function addTab(tab) {
                this.tabs.push(tab);
            };
            this.selectTab = function selectTab(index) {
                for (var i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].selected = false;
                }
                this.tabs[index].selected = true;
            };
        };
        f.controllerAs = 'tabs';
        f.link = function ($scope, $element, $attrs, $ctrl) {
            $ctrl.selectTab($attrs.active || 0);
        };
        f.templateUrl = "partials/tabs.html";

        return f;

    }

})();