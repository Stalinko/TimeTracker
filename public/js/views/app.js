define([
    'models/record'
], function (Record) {
    return Backbone.View.extend({
        el: '.container-fluid',
        rowAdd: null, //строчка для добавления записи
        events: {
            'click .btn-delete': 'deleteRecord',
            'click .btn-edit': 'editRecord',
            'click .btn-update': 'updateRecord',
            'dblclick .row-record td': 'editRecord',
            'click #btn-add': 'addRecord',
            'keyup .row-input input': 'onKeyUp',
            'focus .input-date': 'initDatepicker'
        },
        initialize: function () {
            this.rowAdd = $('#row-add');
            this.rowAdd.find('.input-time').focus();
            this.rowAdd.find('input').tooltip();
        },

        initDatepicker: function(e){
            $(e.target).datepicker({
                dateFormat: 'yy-mm-dd',
                firstDay: 1
            });
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
            '<td><input class="input-desc" value="<%- desc %>"></td>' +
            '<td><button class="btn btn-default btn-update">Save record</button></td>' +
            '</tr>'
        ),

        //Adding new record
        addRecord: function () {
            var record = new Record({row: this.rowAdd});
            record.save({}, {
                success: _.bind(this.successAdd, this),
                error: _.bind(this.errorSave, this)
            });
        },

        /**
         * @Record model
         */
        successAdd: function (model) {
            model.row.find('input').popover('destroy');

            $(this.rowTemplate(model.getAttrsFormatted())).insertAfter(model.row);

            model.row.find('.input-time, .input-desc').val('');
            model.row.find('.input-time').focus();

            this.updateSum();
        },

        successUpdate: function (model) {
            model.row.find('input').popover('destroy');
            model.row.replaceWith(this.rowTemplate(model.getAttrsFormatted()));
            this.updateSum();
        },

        errorSave: function (model, result) {
            this.showErrors(model.row, result.responseJSON);
        },

        //delete
        deleteRecord: function (e) {
            if (!confirm('Are you sure to delete this row?')) {
                return;
            }
            var parent = $(e.target).parents('.row-record'),
                id = parent.data('id');

            (new Record({id: id})).destroy({
                success: function () {
                    parent.remove();
                }
            });
        },

        //edit
        editRecord: function (e) {
            var row = $(e.target).parents('.row-record'),
                record = {id: row.data('id')};

            if (row.attr('id') == 'row-add') {
                return;
            }

            _.each(['date', 'time', 'desc'], function (name) {
                record[name] = row.find('.col-' + name).text();
            });

            row.replaceWith(this.rowEditTemplate(record));
        },

        //Save edited record
        updateRecord: function (e) {
            var parent = $(e.target).parents('.row-input'),
                record = new Record({row: parent});

            record.save({}, {
                success: _.bind(this.successUpdate, this),
                error: _.bind(this.errorSave, this)
            });
        },

        //обработка нажатий клавиш
        onKeyUp: function (e) {
            if (e.which == 13) {
                var focus = $(document.activeElement),
                    row = focus.parents('.row-input');
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
            $('.col-time').each(function () {
                sum += parseFloat($(this).text());
            });

            $('#time-sum').text(Math.round(sum * 100) / 100);
        }
    });
});
