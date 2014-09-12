define([
    'models/record',
    'collections/records'
], function (Record, RecordsCollection) {
    return Backbone.View.extend({
        el: '.timetable',
        events: {
            'click .btn-delete': 'deleteRecord',
            'click .btn-edit': 'editRecord',
            'click .btn-update': 'updateRecord',
            'dblclick .row-record td': 'editRecord',
            'click #btn-add': 'addRecord',
            'keyup .row-input input': 'onKeyUp',
            'focus .input-date': 'initDatepicker'
        },
        rowAdd: null,
        records: null,
        isTimeAmount: true, //вид инпутов для времени

        initialize: function(){
            window.eventManager.on('record:add record:update', this.updateSum, this);
            window.eventManager.on('time-switcher:change', this.changeTimeInput, this);
            this.records = new RecordsCollection(window.appData.records);
            this.rowAdd = $('#row-add');
        },


        initDatepicker: function(e){
            $(e.currentTarget).datepicker();
        },

        render: function(){
            var that = this;
            this.records.each(function(record){
                that.rowAdd.after(that.rowTemplate(record.getAttrsFormatted()));
            });

            this.updateSum();
        },

        rowTemplate: _.template(
            '<tr data-id="<%- id %>" class="row-record">' +
            '<td class="col-date"><%- date %></td>' +
            '<td class="col-time"><%- time %></td>' +
            '<td class="col-desc"><%- description %></td>' +
            '<td>' +
            '<a class="btn-edit" title="Edit"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp;&nbsp;&nbsp; ' +
            '<a class="btn-delete" title="Remove"><span class="glyphicon glyphicon-trash"></span></a>' +
            '</td>' +
            '</tr>'
        ),

        rowEditTemplate: _.template(
            '<tr class="row-input" data-id="<%- id %>">' +
            '<td><input class="input-date" value="<%- date %>"></td>' +
            '<td>' +
                '<input class="input-time" value="<%- time %>">' +
                '<input class="input-time-from" title="When the work was begun?" placeholder="hh:mm" value="<%- timeFrom %>"> ' +
                '<input class="input-time-to" title="When the work was finished?" placeholder="hh:mm" value="<%- timeTo %>">' +
            '</td>' +
            '<td><input class="input-desc" value="<%- description %>"></td>' +
            '<td><button class="btn btn-default btn-update">Save record</button></td>' +
            '</tr>'
        ),

        //Adding new record
        addRecord: function () {
            var record = new Record();
            record.populate(this.rowAdd).save({}, {
                success: _.bind(this.successAdd, this),
                error: _.bind(this.errorSave, this)
            });
        },

        /**
         * @Record model
         */
        successAdd: function (model) {
            this.rowAdd.find('input').popover('destroy');

            $(this.rowTemplate(model.getAttrsFormatted())).insertAfter(this.rowAdd);

            this.rowAdd.find('.input-time, .input-desc, .input-time-from, .input-time-to').val('');
            this.rowAdd.find('.input-time').focus();

            this.records.add(model);
            window.eventManager.trigger('record:add', model);
        },

        successUpdate: function (model) {
            var row = model.getRow();

            row.find('input').popover('destroy');
            row.replaceWith(this.rowTemplate(model.getAttrsFormatted()));

            window.eventManager.trigger('record:update', model);
        },

        errorSave: function (model, result) {
            this.showErrors(model.getRow(), result.responseJSON);
        },

        //delete
        deleteRecord: function (e) {
            if (!confirm('Are you sure to delete this row?')) {
                return;
            }
            var parent = $(e.currentTarget).parents('.row-record'),
                id = parent.data('id');

            this.records.get(id).destroy({
                success: function () {
                    parent.remove();
                }
            });
        },

        //edit
        editRecord: function (e) {
            var row = $(e.currentTarget).parents('.row-record');

            if (row.attr('id') == 'row-add') {
                return;
            }

            var id = row.data('id'),
                record = this.records.get(id),
                rowEdit = $(this.rowEditTemplate(record.getAttrsFormatted()));
            row.replaceWith(rowEdit);
            rowEdit.find('.input-time, .input-time-from').focus();
        },

        //Save edited record
        updateRecord: function (e) {
            var row = $(e.currentTarget).parents('.row-input'),
                id = row.data('id'),
                record = this.records.get(id).populate(row);

            if(this.isTimeAmount){
                record.unset('timeFrom').unset('timeTo');
            }else{
                record.unset('time');
            }

            record.save({}, {
                success: _.bind(this.successUpdate, this),
                error: _.bind(this.errorSave, this)
            });
        },

        //обработка нажатий клавиш
        onKeyUp: function (e) {
            var focus = $(document.activeElement),
                row = focus.parents('.row-input');
            if (e.which == 13) {
                var nextMap = {
                    'input-date': '.input-time',
                    'input-time': '.input-desc',
                    'input-time-from': '.input-time-to',
                    'input-time-to': '.input-desc'
                };

                _.each(nextMap, function(next, current){
                    if(focus.hasClass(current)){
                        row.find(next).focus();
                    }
                });

                if(focus.hasClass('input-desc')){
                    row.find('.btn').click();
                }
            }else if(e.which == 27){
                if(row.length && row.attr('id') != 'row-add'){
                    var id = row.data('id'),
                        model = this.records.get(id);

                    row.find('input').popover('destroy');
                    row.replaceWith(this.rowTemplate(model.getAttrsFormatted()));
                }
            }
        },

        //показываем ошибки
        showErrors: function (row, errors) {
            var top = true;

            if(this.isTimeAmount){
                delete errors.timeFrom;
                delete errors.timeTo;
            }else{
                delete errors.time;
            }

            _.each(errors, function (list, field) {
                field = field.replace('description', 'desc');
                field = field.replace('timeFrom', 'time-from');
                field = field.replace('timeTo', 'time-to');

                row.find('.input-' + field).popover('destroy').popover({
                    content: '<span class="text-danger">' + _.first(list) + '</span>',
                    placement: top ? 'top' : 'bottom',
                    html: true
                }).popover('show');

                top = !top;
            });
        },

        //recalculate sum
        updateSum: function () {
            var sum = 0;
            this.records.each(function(record){
                sum += parseFloat(record.get('time'));
            });

            $('#time-sum').text(Math.round(sum * 100) / 100);
        },

        changeTimeInput: function(state){
            this.isTimeAmount = state;
            this.$el.toggleClass('range-times');
        }
    });
});
