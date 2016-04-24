/*global require*/
'use strict';

require.config({
	paths: {
		angular: '../node_modules/angular/angular'
	},
    
    // Configure the exports for angular (as angular doesn't use define)
	shim: {
		angular: {
			exports: 'angular'
		}
	},
    
    // Execute the code in app.js 
	deps: ['app']
});
