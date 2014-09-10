<?php

/**
 * Class Record
 * @method static Record getModel
 */
class Record extends Eloquent {
    protected $fillable = ['date', 'time', 'description'];

    public static function create(array $attributes)
    {
        if(preg_match('/(\d*):(\d+)/', $attributes['time'], $m)){
            $attributes['time'] = $m[1] + $m[2] / 60;
        }else{
            $attributes['time'] = (float)str_replace(',', '.', $attributes['time']);
        }
        return parent::create($attributes);
    }

    public function save(array $options = array())
    {
        $this->user_id = Auth::id();
        return parent::save($options);
    }


}