require.config({
    paths: {
        // Major libraries
        jquery: 'libs/jquery-2.1.1.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        bootstrap: 'libs/bootstrap.min',
        appView: 'views/app',
        bootstrapSwitch: 'libs/bootstrap-switch.min'
    },
    shim: {
        'bootstrap': {deps: ['jquery']},
        'appView': {deps: ['backbone']},
        'bootstrapSwitch': {deps: ['bootstrap']}
    }
});

// Let's kick off the application
require([
    'backbone',
    'appView',
    'jquery',
    'libs/jquery-ui',
    'bootstrap',
    'underscore',
    'bootstrapSwitch'
], function (b,AppView) {
    new AppView();
});
