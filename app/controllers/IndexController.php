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

    /**
     * Главная страница
     */
    public function anyIndex(){
        if(Auth::guest()){
            return Redirect::to('/enter');
        }

        $this->layout->content = View::make('index');
    }

    /**
     * Форма входа / регистрации
     */
    public function getEnter()
	{
        if(Auth::check()){
            return Redirect::to('/');
        }

        $this->layout->content = View::make('enter');
	}

    /**
     * Обработка формы
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function postEnter(){
        if(Auth::check()){
            return Redirect::to('/');
        }

        $email = Input::get('email');
        $password = Input::get('password');

        if(Auth::attempt(['email' => $email, 'password' => $password])){
            Session::flash('logged_in', true);
            Session::flash('success', 'You logged in');
            return Redirect::to('/');
        }else{
            Input::flash();
            $validator = Validator::make(
                Input::all(),
                [
                    'email' => ['required', 'email', 'unique:users,email'],
                    'password' => 'required',
                ],
                ['email.unique' => 'UNIQUE']
            );

            if($validator->fails()){
                $msgs = $validator->messages();
                if($msgs->has('email') && in_array('UNIQUE', $msgs->get('email'))){
                    $msgs = new \Illuminate\Support\MessageBag(['password' => 'Wrong password']);
                }

                return Redirect::to('/enter')->withErrors($msgs);
            }else{
                $user = User::create(['email' => $email, 'password' => Hash::make($password)]);
                Auth::login($user);

                Session::flash('success', 'New account was created');
                return Redirect::to('/');
            }
        }
    }

    public function getLogout(){
        Auth::logout();
        Session::flash('success', 'You logged out');
        return Redirect::to('/');
    }

}
