require.config({
    paths: {
        // Major libraries
        jquery: 'libs/jquery-2.1.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        bootstrap: 'libs/bootstrap.min',
        appView: 'views/app'
    },
    shim: {
        'bootstrap': {deps: ['jquery']},
        'appView': {deps: ['backbone']}
    }
});

// Let's kick off the application
require([
    'backbone',
    'appView',
    'jquery',
    'libs/jquery-ui',
    'bootstrap',
    'underscore'
], function (b,AppView) {
    new AppView();
});
