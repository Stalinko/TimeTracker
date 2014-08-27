function addRecord(){

}

$(function(){
    $('#input-date').datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: 1
    });

    $('.input-row input').keyup(function(e){
        if(e.which == 13){
            switch (e.activeElement.id){
                case 'input-date': $('#input-time').focus(); break;
                case 'input-time': $('#input-desc').focus(); break;
            }
        }
    });
});



