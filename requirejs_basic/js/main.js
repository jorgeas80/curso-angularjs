require.config({
    baseUrl: 'js/',
    paths: {
        jquery: './vendor/jquery-1.12.1.min',
        bootstrap: './vendor/bootstrap.min',
        angular: './vendor/angular',

    },
    shim: {
        angular: {
            exports : 'angular'
        }
    },
    
    deps: ['app']
});