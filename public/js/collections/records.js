define([
    'models/record'
], function(Record){
    return Backbone.Collection.extend({
        model: Record,
        comparator: function(record){
            return new Date(record.get('date'));
        }
    });
});
