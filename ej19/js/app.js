(function() {
    angular
        .module('plunker', [])
        .directive('sampleOne', function (){
            // this is an attribute with no required controllers, 
            // and no isolated scope, so we're going to use all the
            // defaults, and just providing a linking function.

            return function(scope, elem, attrs) {
                elem.bind('click', function(){

                    // $eval is evaluating angular expressions. Not just plain js
                    // Check http://stackoverflow.com/a/15671573/593722
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

