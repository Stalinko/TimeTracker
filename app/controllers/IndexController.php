<?php

class IndexController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

    public function anyIndex(){
        return Redirect::to('/enter');
    }

	public function getEnter()
	{
        $this->layout->content = View::make('enter');
	}

    public function postEnter(){
        if(Auth::attempt([]))

        return Redirect::to('/enter');
    }

}
