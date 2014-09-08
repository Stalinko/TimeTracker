define(function () {
    return Backbone.Model.extend({
        defaults: {
        },
        row: null, //tr-node

        constructor: function (attrs, options) {
            if (attrs.row) {
                this.row = attrs.row;
                attrs = this.getData(attrs.row);
            }

            Backbone.Model.call(this, attrs, options);
        },

        url: function(){
            return this.get('id') ? '/record/' + this.get('id') : '/record';
        },

        getData: function (row) {
            return {
                id: row.data('id'),
                date: row.find('.input-date').val(),
                time: row.find('.input-time').val(),
                description: row.find('.input-desc').val()
            };
        },

        //return formatted time
        getAttrsFormatted: function(){
            var attrs = this.attributes;
            attrs.time = Math.round(attrs.time * 100) / 100;
            return attrs;
        }
    });
});
