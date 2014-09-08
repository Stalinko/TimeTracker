define([
    'views/timetableLogic',
    'views/timetableBeauty'
], function (TimetableLogicView, TimetableBeautyView) {
    return Backbone.View.extend({
        el: '.container-fluid',
        initialize: function () {
            new TimetableLogicView();
            new TimetableBeautyView();
        }
    });
});
