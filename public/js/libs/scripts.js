var row_template = _.template(
    '<tr data-id="<%- id %>" class="row-record">' +
        '<td class="col-date"><%- date %></td>' +
        '<td class="col-time"><%- time %></td>' +
        '<td class="col-desc"><%- description %></td>' +
        '<td>' +
            '<a class="btn-edit" title="Edit"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp;&nbsp;&nbsp; ' +
            '<a class="btn-delete" title="Remove"><span class="glyphicon glyphicon-trash"></span></a>' +
        '</td>' +
    '</tr>'
);

var row_edit_template = _.template(
    '<tr class="row-input" data-id="<%- id %>">' +
        '<td><input class="input-date" value="<%- date %>"></td>' +
        '<td><input class="input-time" value="<%- time %>"></td>' +
        '<td><input class="input-desc" value="<%- desc %>"></td>' +
        '<td><button class="btn btn-default btn-update">Save record</button></td>' +
    '</tr>'
);

/**
 * Adding new record
 */
function addRecord(){
    var row = $('#row-add');
    $.post('/record', getData(row), function(result){
        row.find('input').popover('destroy');
        if(result.success){
            result.record.time = Math.round(result.record.time * 100) / 100;
            $(row_template(result.record)).insertAfter(row);

            $('#row-add .input-time, #row-add .input-desc').val('');
            $('#row-add .input-time').focus();

            updateSum();
        }else{
            showErrors(row, result.errors);
        }
    });
}

/**
 * Deleting record
 */
function deleteRecord(){
    if(!confirm('Are you sure to delete this row?')){
        return;
    }
    var parent = $(this).parents('.row-record'),
        id = parent.data('id');

    $.ajax({
        url : '/record/' + id,
        type: 'DELETE',
        success: function(result){
            parent.remove();
        }
    });
}

/**
 * Edit
 */
function editRecord(){
    var row = $(this).parents('.row-record'),
        record = {id: row.data('id')};

    if(row.attr('id') == 'row-add'){
        return;
    }

    _.each(['date', 'time', 'desc'], function(name){
        record[name] = row.find('.col-' + name).text();
    });

    row.replaceWith(row_edit_template(record));
}

/**
 * Save edited record
 */
function updateRecord(){
    var parent = $(this).parents('.row-input'),
        id = parent.data('id');

    $.ajax({
        url: '/record/' + id,
        type: 'PUT',
        data: getData(parent),
        success: function(result){
            parent.find('input').popover('destroy');

            if(result.success){
                result.record.time = Math.round(result.record.time * 100) / 100;
                parent.replaceWith($(row_template(result.record)));

                updateSum();
            }else{
                showErrors(parent, result.errors);
            }
        }
    });
}

function showErrors(row, errors){
    var top = true;

    _.each(errors, function(list, field){
        field = field.replace('description', 'desc');
        row.find('.input-' + field).popover({
            content: '<span class="text-danger">' + _.first(list) + '</span>',
            placement: top ? 'top' : 'bottom',
            html: true
        }).popover('show');

        top = !top;
    });
}

/**
 * @param row
 * @returns {{date: *, time: *, description: *}}
 */
function getData(row){
    return {
        date: row.find('.input-date').val(),
        time: row.find('.input-time').val(),
        description: row.find('.input-desc').val()
    };
}

/**
 * Recalculate sum
 */
function updateSum(){
    var sum = 0;
    $('.col-time').each(function(){
        sum += parseFloat($(this).text());
    });

    $('#time-sum').text(Math.round(sum * 100) / 100);
}

/**
 * On startup
 */
$(function(){
    $('#row-add .input-time').focus();

    $('#row-add .input-date').datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: 1
    });

    $('#row-add input').tooltip();

    $(document).on('keyup', '.row-input input', function(e){
        if(e.which == 13){
            var focus = $(document.activeElement),
                row = focus.parents('.row-input');
            switch (true){
                case focus.hasClass('input-date'): row.find('.input-time').focus(); break;
                case focus.hasClass('input-time'): row.find('.input-desc').focus(); break;
                case focus.hasClass('input-desc'): row.find('.btn').click(); break;
            }
        }
    });

    $(document).on('click', '.btn-delete', deleteRecord);
    $(document).on('click', '.btn-edit', editRecord);
    $(document).on('click', '.btn-update', updateRecord);
    $(document).on('dblclick', '.row-record td', editRecord);
    $('#btn-add').click(addRecord);
});



