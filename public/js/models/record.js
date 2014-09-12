define(function () {
    return Backbone.Model.extend({
        defaults: {
        },

        url: function(){
            return this.get('id') ? '/record/' + this.get('id') : '/record';
        },

        populate: function (row) {
            return this.set({
                id: row.data('id'),
                date: row.find('.input-date').val(),
                time: row.find('.input-time').val(),
                timeFrom: row.find('.input-time-from').val(),
                timeTo: row.find('.input-time-to').val(),
                description: row.find('.input-desc').val()
            });
        },

        //return formatted time
        getAttrsFormatted: function(){
            var attrs = _.clone(this.attributes);
            attrs.time = Math.round(attrs.time * 100) / 100;
            
            if(attrs.timeFrom){
                attrs.timeFrom = Math.floor(attrs.timeFrom / 60 || '00') + ':' + (attrs.timeFrom % 60 || '00');
            }else{
                attrs.timeFrom = '';
            }
            if(attrs.timeTo){
                attrs.timeTo = Math.floor(attrs.timeTo / 60 || '00') + ':' + (attrs.timeTo % 60 || '00');
            }else{
                attrs.timeTo = '';
            }

            return attrs;
        },

        getRow: function(){
            var that = this;
            return $('.timetable tr').filter(function(){
                return $(this).data('id') == that.get('id');
            });
        }
    });
});
