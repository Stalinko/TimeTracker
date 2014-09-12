<?php

/**
 * Class Record
 * @method static Record getModel
 */
class Record extends Eloquent {
    protected $fillable = ['date', 'time', 'description', 'timeFrom', 'timeTo'];

    public function save(array $options = array())
    {
        $this->parseAtts();
        $this->user_id = Auth::id();
        return parent::save($options);
    }

    private function parseAtts(){
        $attrs = $this->attributes;
        
        if(!empty($attrs['timeFrom'])){
            $from = explode(':', $attrs['timeFrom']);
            $to = explode(':', $attrs['timeTo']);
            $attrs['timeFrom'] = $from[0] * 60 + $from[1];
            $attrs['timeTo'] = $to[0] * 60 + $to[1];
            $attrs['time'] = ($attrs['timeTo'] - $attrs['timeFrom']) / 60;
        }else{
            if(preg_match('/(\d*):(\d+)/', $attrs['time'], $m)){
                $attrs['time'] = $m[1] + $m[2] / 60;
            }else{
                $attrs['time'] = (float)str_replace(',', '.', $attrs['time']);
            }

            unset($attrs['timeTo']);
            unset($attrs['timeFrom']);
        }

        $this->attributes = $attrs;

        return $this;
    }
}