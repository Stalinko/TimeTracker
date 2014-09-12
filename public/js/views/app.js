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

            (new TimetableLogicView()).render();
            (new TimetableBeautyView()).render();
            (new MakeReportView()).render();

            $('.field-format-switcher').bootstrapSwitch({
                onSwitchChange: function(e, state){
                    window.eventManager.trigger('time-switcher:change', state);
                }
            });
        }
    });
});
