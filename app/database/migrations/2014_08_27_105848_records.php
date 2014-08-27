<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Records extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('
            CREATE TABLE records (
              id int(10) unsigned NOT NULL AUTO_INCREMENT,
              user_id int unsigned NOT NULL,
              `date` date NOT NULL,
              `time` int unsigned NOT NULL,
              description VARCHAR (1024) NOT NULL DEFAULT "",
              created_at DATETIME NOT NULL,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              PRIMARY KEY (id),
              KEY (`date`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8
        ');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('records');
	}

}
