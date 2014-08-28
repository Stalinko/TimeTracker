<div class="row-fluid">
    <div class="pull-right">
        @if (Auth::check())
        You entered as <strong>{{{ Auth::getUser()->email }}}</strong>
        <a class="btn btn-danger" href="/logout">Logout</a>
        @endif
    </div>

    @if ($success = Session::get('success'))
    <div class="alert alert-success span2 offset5">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{{ $success }}}
    </div>
    @endif
</div>

<table class="table table-hover table-condensed timetable">
    <tr>
        <th class="col-date">Date</th>
        <th class="col-time">Time &sum;</th>
        <th class="col-desc">Description</th>
        <th>&nbsp;</th>
    </tr>
    <tr class="input-row">
        <td><input id="input-date" value="{{ date('Y-m-d') }}"></td>
        <td><input id="input-time"></td>
        <td><input id="input-desc"></td>
        <td><button class="btn" id="btn-add-record">Add record</button></td>
    </tr>
    @foreach($records as $row)
    <tr>
        <td>{{ $row->date }}</td>
        <td>{{ round($row->time, 2) }}</td>
        <td>{{ $row->description }}</td>
        <td></td>
    </tr>
    @endforeach
    <tr>
        <td></td>
        <td colspan="2">&sum;: <span id="time-sum">{{ round($sum, 2) }}</span></td>
        <td></td>
    </tr>
</table>
