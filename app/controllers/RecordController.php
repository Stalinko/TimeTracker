<?php

class RecordController extends BaseController {
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        if($errors = $this->validateRecord()){
            $result = $errors;
            $code = 400;
        }else{
            $record = Record::create(Input::all() + ['user_id' => Auth::id()]);
            $result = $record->toArray();
            $code = 200;
        }

        return Response::json($result, $code);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        if($errors = $this->validateRecord()){
            $result = $errors;
            $code = 400;
        }else{
            $record = Record::where('id', $id)->where('user_id', Auth::id())->first();
            if(!$record){
                App::abort(404);
            }

            $record->fill(Input::all())->save();

            $result = $record->toArray();
            $code = 200;
        }

        return Response::json($result, $code);
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

    /**
     *
     * @return bool|\Illuminate\Support\MessageBag|false Errors
     */
    private function validateRecord(){
        $input = Input::all();
        $rules = [
            'date' => ['required', 'regex:/^\d\d\d\d-\d\d-\d\d$/'],
            'time' => ['required', 'regex:/^\d*[:,.]?\d+$/'],
            'timeFrom' => ['required', 'regex:/^\d{1,2}:\d{1,2}$/'],
            'timeTo' => ['required', 'regex:/^\d{1,2}:\d{1,2}$/'],
            'description' => 'max:1024',
        ];

        if(!empty($input['timeFrom']) || !empty($input['timeTo'])){
            unset($rules['time']);
        }elseif(!empty($input['time'])){
            unset($rules['timeFrom']);
            unset($rules['timeTo']);
        }

        $validator = Validator::make($input, $rules, [
            'date' => 'Date must have format "yyyy-mm-dd"',
            'time.regex' => 'Available time formats: .5 (half hour), 6:15 (6 hours, 15 minutes), 19.50 (19 and a half hours)',
            'timeFrom.regex' => 'Must have format hh:mm',
            'timeTo.regex' => 'Must have format hh:mm',
            'required' => 'This field is required',
        ]);

        if($validator->fails()){
            return $validator->messages();
        }else{
            return false;
        }
    }

}
