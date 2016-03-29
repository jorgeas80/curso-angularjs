(function() {
    angular
        .module('plunker', [])
        .directive('sampleOne', function (){
            // this is an attribute with no required controllers, 
            // and no isolated scope, so we're going to use all the
            // defaults, and just providing a linking function.

            return function(scope, elem, attrs) {
                elem.bind('click', function(){
                    elem.text(scope.$eval(attrs.sampleOne));
                });
            };
        })

        .directive('sampleTwo', function (){
            return {
                restrict: 'E',
                template: '<div>{{value}}</div>',
                scope: {
                    value: '='
                }
            };
        });
})();

