/**
 * Created by jorge on 2/05/16.
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            "vendor/jasmine.js",    // If we don't specify jasmine here, it'll use the generic one!
            "vendor/angular.js",
            "vendor/angular-mocks.js",
            "app.js",
            "specs.js"
        ],
        autoWatch: true,
        browsers: ['Chrome']
    });
};