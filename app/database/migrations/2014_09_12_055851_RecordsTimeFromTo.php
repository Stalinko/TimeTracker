<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RecordsTimeFromTo extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('
            ALTER TABLE records   
              ADD COLUMN timeFrom SMALLINT NULL AFTER time,
              ADD COLUMN timeTo SMALLINT NULL AFTER timeFrom;
        ');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
