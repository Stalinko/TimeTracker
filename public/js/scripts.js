var row_template = _.template(
    '<tr data-id="<%- id %>" class="row-record">' +
    '<td><%- date %></td>' +
    '<td><%- time %></td>' +
    '<td><%- description %></td>' +
    '<td>' +
        '<button class="btn btn-small btn-link btn-delete" title="Edit"><i class="icon-pencil"></i></button>' +
        '<button class="btn btn-small btn-link btn-delete" title="Remove"><i class="icon-trash"></i></button>' +
    '</td>' +
    '</tr>'
);

/**
 * Adding new record
 */
function addRecord(){
    $.post('/record', {
        date: $('#input-date').val(),
        time: $('#input-time').val(),
        description: $('#input-desc').val()
    }, function(result){
        if(result.success){
            result.record.time = Math.round(result.record.time * 100) / 100;
            $(row_template(result.record)).insertAfter('tr.input-row');

            $('#input-time, #input-desc').val('');
            $('#input-time').focus();

            var $time_sum = $('#time-sum'),
                sum = parseFloat($time_sum.text()) + parseFloat(result.record.time);
            $time_sum.text(Math.round(sum * 100) / 100);
        }
    });
}

/**
 * Deleting record
 */
function deleteRecord(){
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
 * On startup
 */
$(function(){
    $('#input-time').focus();

    $('#input-date').datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: 1
    });

    $('.input-row input').keyup(function(e){
        if(e.which == 13){
            switch (document.activeElement.id){
                case 'input-date': $('#input-time').focus(); break;
                case 'input-time': $('#input-desc').focus(); break;
                case 'input-desc': addRecord(); break;
            }
        }
    });

    $('.btn-delete').click(deleteRecord);
    $('#btn-add-record').click(addRecord);
});



