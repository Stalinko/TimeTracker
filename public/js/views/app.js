define([
    'views/timetableLogic',
    'views/timetableBeauty',
    'views/makeReport'
], function (TimetableLogicView, TimetableBeautyView, MakeReportView) {
    return Backbone.View.extend({
        el: '.container-fluid',
        initialize: function () {
            $.datepicker.setDefaults({
                dateFormat: 'yy-mm-dd',
                firstDay: 1
            });

            window.eventManager = _.extend({}, Backbone.Events);

            new TimetableLogicView();
            new TimetableBeautyView();
            new MakeReportView();
        }
    });
});
