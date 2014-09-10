/*
Разные красивости - подсказки и прочее оформление
 */
define([], function () {
    return Backbone.View.extend({
        el: '.timetable',
        dateHighlight: '', //строки за эту дату подсвечены в данный момент
        highlightColor: '#D6FBFF',
        events: {
            'mouseenter .row-record': 'hoverDaySumEnter',
            'mouseleave .row-record': 'hoverDaySumLeave'
        },
        initialize: function () {
            var rowAdd = $('#row-add');
            rowAdd.find('.input-time').focus();
            rowAdd.find('input').tooltip();

            window.eventManager.on('time-switcher:change', this.changeTimeInput, this);
        },

        hoverDaySumEnter: function(e){
            var date = $(e.currentTarget).find('.col-date').text();

            if(this.dateHighlight && date !== this.dateHighlight){
                this.$el.find('.col-date:contains(' + this.dateHighlight + ')').parents('.row-record')
                    .css('background-color', '')
                    .tooltip('destroy');
            }

            if(this.dateHighlight !== date){
                this.dateHighlight = date;

                var sum = 0;
                this.$el.find('.col-date:contains(' + date + ')').parents('.row-record').each(function(){
                    sum += parseFloat($(this).find('.col-time').text());
                })
                    .css('background-color', this.highlightColor)
                    .last().tooltip({
                        title: '<span class="hint-sum">&sum;: ' + sum + '</span>',
                        html: true,
                        trigger: 'manual',
                        container: 'body'
                    }).tooltip('show');
            }
        },

        hoverDaySumLeave: function(e){
            var newTarget = e.toElement || e.relatedTarget;
            if($(newTarget).parents('.row-record').length == 0){
                var date = $(e.currentTarget).find('.col-date').text();
                this.$el.find('.col-date:contains('+date+')').parents('.row-record')
                    .css('background-color', '')
                    .tooltip('destroy');
                this.dateHighlight = '';
            }
        },

        changeTimeInput: function(state){
            
        }
    });
});
