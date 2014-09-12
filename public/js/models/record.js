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
                description: row.find('.input-desc').val()
            });
        },

        //return formatted time
        getAttrsFormatted: function(){
            var attrs = this.attributes;
            attrs.time = Math.round(attrs.time * 100) / 100;
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
