function addRecord(){
    $.post('/record', {
        date: $('#input-date').val(),
        time: $('#input-time').val(),
        description: $('#input-desc').val()
    }, function(result){
        if(result.success){
            $(
                '<tr>' +
                    '<td>' + result.record.date + '</td>' +
                    '<td>' + Math.round(result.record.time * 100) / 100 + '</td>' +
                    '<td>' + result.record.description + '</td>' +
                    '<td></td>' +
                '</tr>'
            ).insertAfter('tr.input-row');

            $('#input-time, #input-desc').val('');
            $('#input-time').focus();

            var $time_sum = $('#time-sum'),
                sum = parseFloat($time_sum.text()) + parseFloat(result.record.time);
            $time_sum.text(Math.round(sum * 100) / 100);
        }
    });
}

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

    $('#btn-add-record').click(addRecord);
});



