<div class="row">
    <div class="col-lg-12 settings">
        Time field format: <input type="checkbox" data-on-text="amount" data-off-text="range" class="field-format-switcher" checked>
    </div>
    <div class="col-lg-12">
        <div class="pull-right ">
            @if (Auth::check())
            You entered as <strong>{{{ Auth::getUser()->email }}}</strong>
            <a class="btn btn-danger" href="/logout">Logout</a>
            @endif
        </div>

        @if(!$report)
        {{ $records->appends(Input::only('date-from', 'date-to'))->links()  }}
        @endif

        <form class="input-group make-report pull-left" method="get">
            <input type="text" class="form-control date-to" placeholder="Date from..." name="date-from" value="{{{ Input::get('date-from') }}}">
            <span class="input-group-btn" style="width:0"></span>
            <input type="text" class="form-control date-from" placeholder="...date to" style="margin-left: -1px;" name="date-to" value="{{{ Input::get('date-to') }}}">
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary" style="margin-left: -2px;">Make report</button>
                @if($report)
                <button type="button" class="btn btn-danger btn-reset" style="margin-left: -2px;">Reset</button>
                @endif
            </span>
        </form><!-- /input-group -->
    </div>

    @if ($success = Session::get('success'))
    <div class="alert alert-success col-lg-2 col-lg-offset-5">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{{ $success }}}
    </div>
    @endif

</div>


<table class="table table-condensed timetable">
    <tr>
        <th>Date</th>
        <th>Time &sum;</th>
        <th>Description</th>
        <th>&nbsp;</th>
    </tr>
    <tr class="row-input" id="row-add">
        <td data-toggle="popover"><input class="input-date" value="{{ date('Y-m-d') }}" placeholder="yyyy-mm-dd" data-toggle="tooltip" data-placement="top" title="Date in format &quot;yyyy-mm-dd&quot;"></td>
        <td>
            <input class="input-time" title="Format like 19.5 or 12:45" placeholder="hh:mm">
            <input class="input-time-from" title="When the work was begun?" placeholder="hh:mm">
            <input class="input-time-to" title="When the work was finished?" placeholder="hh:mm">
        </td>
        <td><input class="input-desc" title="" placeholder="Some great job has been done"></td>
        <td><button class="btn btn-default" id="btn-add">Add record</button></td>
    </tr><tr>
        <td></td>
        <td colspan="2">&sum;: <span id="time-sum"></span></td>
        <td></td>
    </tr>
</table>

@if(!$report)
<div class="row">
{{ $records->appends(Input::only('date-from', 'date-to'))->links()  }}
</div>
@endif

<script>
    appData['minDate'] = '{{{ $minDate }}}';
    appData['maxDate'] = '{{{ $maxDate }}}';
    appData['records'] =  {{ json_encode($report ? $records->toArray() : $records->getCollection()->toArray(), JSON_UNESCAPED_UNICODE) }};
</script>
