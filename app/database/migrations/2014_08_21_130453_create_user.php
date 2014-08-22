<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUser extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('
            CREATE TABLE users (
              id int(10) unsigned NOT NULL AUTO_INCREMENT,
              email varchar(255) NOT NULL,
              name varchar(255) NOT NULL,
              remember_token VARCHAR (100) NOT NULL DEFAULT "",
              PRIMARY KEY (id),
              UNIQUE KEY emun (email)
            ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8
        ');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
	}

}
