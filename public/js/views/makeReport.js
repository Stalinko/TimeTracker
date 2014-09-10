define([], function () {
    return Backbone.View.extend({
        el: '.make-report',
        events: {
            'click .btn-reset': 'resetForm'
        },
        initialize: function () {
            this.$el.find('.date-from, .date-to').datepicker({
                minDate: window.minDate,
                maxDate: window.maxDate
            });
        },
        resetForm: function(){
            this.$el.find('.date-from, .date-to').val('');
            this.$el[0].submit();
        }
    });
});
