<?php

class RecordController extends BaseController {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        $validator = Validator::make(Input::all(), [
            'date' => ['required', 'regex:/^\d\d\d\d-\d\d-\d\d$/'],
            'time' => ['required', 'regex:/^\d*[:,.]?\d+$/'],
            'description' => 'max:1024',
        ], [
            'date' => 'Date must have format "yyyy-mm-dd"',
            'time' => 'Available time formats: .5 (half hour), 6:15 (6 hours, 15 minutes), 19.50 (19 and a half hours)',
        ]);

        if($validator->fails()){
            $result = ['errors' => $validator->messages()->toArray()];
        }else{
            $record = Record::create(Input::all() + ['user_id' => Auth::id()]);
            $result = ['success' => true, 'record' => $record->toArray()];
        }

        return Response::json($result);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$result = Record::where('id', $id)->where('user_id', Auth::id())->delete();
        return Response::json(['success' => (bool)$result]);
	}

    public function missingMethod($parameters = array())
    {
        var_dump($parameters);
    }


}
