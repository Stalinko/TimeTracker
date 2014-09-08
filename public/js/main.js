require.config({
    paths: {
        // Major libraries
        jquery: 'libs/jquery-2.1.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        bootstrap: 'libs/bootstrap.min'
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

// Let's kick off the application
require([
    'backbone',
    'views/app',
    'jquery',
    'libs/jquery-ui',
    'bootstrap',
    'underscore'
], function (b,AppView) {
    new AppView();
});
