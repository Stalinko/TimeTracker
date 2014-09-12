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

        initialize: function(){
            window.eventManager.on('record:add record:update', this.updateSum, this);
            this.records = new RecordsCollection(window.appData.records);
            this.rowAdd = $('#row-add');
        },


        initDatepicker: function(e){
            $(e.currentTarget).datepicker();
        },

        render: function(){
            var that = this;
            this.records.each(function(record){
                that.rowAdd.after(that.rowTemplate(record.toJSON()));
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
            '<td><input class="input-time" value="<%- time %>"></td>' +
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

            this.rowAdd.find('.input-time, .input-desc').val('');
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
            this.showErrors(model.row, result.responseJSON);
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
                record = this.records.get(id);

            var rowEdit = $(this.rowEditTemplate(record.toJSON()));
            row.replaceWith(rowEdit);
            rowEdit.find('.input-time').focus();
        },

        //Save edited record
        updateRecord: function (e) {
            var row = $(e.currentTarget).parents('.row-input'),
                id = row.data('id');

            this.records.get(id).populate(row).save({}, {
                success: _.bind(this.successUpdate, this),
                error: _.bind(this.errorSave, this)
            });
        },

        //обработка нажатий клавиш
        onKeyUp: function (e) {
            var focus = $(document.activeElement),
                row = focus.parents('.row-input');
            if (e.which == 13) {
                switch (true) {
                    case focus.hasClass('input-date'):
                        row.find('.input-time').focus();
                        break;
                    case focus.hasClass('input-time'):
                        row.find('.input-desc').focus();
                        break;
                    case focus.hasClass('input-desc'):
                        row.find('.btn').click();
                        break;
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

            _.each(errors, function (list, field) {
                field = field.replace('description', 'desc');
                row.find('.input-' + field).popover({
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
        }
    });
});
