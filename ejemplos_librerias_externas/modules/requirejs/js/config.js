/* global requirejs */
'use strict';
requirejs.config({
    "paths": {
        "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular",
    },
    "shim": {
        "angular": {
            "exports": "angular"
        }
    }
});

//bootstrap angularjs : angular.bootstrap === ng-app="app"

require(['angular', 'app', 'controllers/MainCtrl'], function (angular) {
    angular.bootstrap(document, ['app']);
});