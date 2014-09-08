<div class="row">
    <div class="col-lg-12">
        <div class="pull-right ">
            @if (Auth::check())
            You entered as <strong>{{{ Auth::getUser()->email }}}</strong>
            <a class="btn btn-danger" href="/logout">Logout</a>
            @endif
        </div>
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
        <td data-toggle="popover"><input class="input-date" value="{{ date('Y-m-d') }}" data-toggle="tooltip" data-placement="top" title="Date in format &quot;yyyy-mm-dd&quot;"></td>
        <td><input class="input-time" title="Format like 19.5 or 12:45"></td>
        <td><input class="input-desc" title=""></td>
        <td><button class="btn btn-default" id="btn-add">Add record</button></td>
    </tr>
    @foreach($records as $row)
    <tr data-id="{{ $row->id }}" class="row-record">
        <td class="col-date">{{ $row->date }}</td>
        <td class="col-time">{{ round($row->time, 2) }}</td>
        <td class="col-desc">{{ $row->description }}</td>
        <td>
              <a class="btn-edit" title="Edit"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp;&nbsp;&nbsp;
              <a class="btn-delete" title="Remove"><span class="glyphicon glyphicon-trash"></span></a>
        </td>
    </tr>
    @endforeach
    <tr>
        <td></td>
        <td colspan="2">&sum;: <span id="time-sum">{{ round($sum, 2) }}</span></td>
        <td></td>
    </tr>
</table>
