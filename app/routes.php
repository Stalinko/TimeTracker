<?php

Route::group(array('before'=>'auth'), function() {
    Route::resource('record', 'RecordController', [
        'only' => ['store', 'update', 'destroy'],
    ]);
});

Route::controller('/', 'IndexController');