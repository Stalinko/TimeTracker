<?php

class ProfileController extends BaseController {
    public function anyIndex(){
        $this->layout->content = View::make('profile/index');
    }
}