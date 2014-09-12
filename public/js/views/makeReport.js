define([], function () {
    return Backbone.View.extend({
        el: '.make-report',
        events: {
            'click .btn-reset': 'resetForm'
        },
        minDate: '',
        maxDate: '',
        initialize: function () {
            this.$el.find('.date-from, .date-to').datepicker({
                minDate: this.minDate = window.appData.minDate,
                maxDate: this.maxDate = window.appData.maxDate
            });

            window.eventManager.on('record:add record:update', this.updateMinMax, this);
        },
        resetForm: function(){
            this.$el.find('.date-from, .date-to').val('');
            this.$el[0].submit();
        },

        updateMinMax: function(record){
            if(record.get('date') < this.minDate){
                this.$el.find('.date-from, .date-to')
                    .datepicker("option", "minDate", this.minDate = record.get('date'))
                    .datepicker('refresh');
            }
            
            if(record.get('date') > this.maxDate){
                this.$el.find('.date-from, .date-to')
                    .datepicker("option", "maxDate", this.maxDate = record.get('date'))
                    .datepicker('refresh');
            }
        }
    });
});
