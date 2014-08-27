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

<table class="table table-bordered table-hover table-condensed timetable">
    <tr>
        <th>Date</th>
        <th>Time &sum;</th>
        <th>Description</th>
        <th></th>
    </tr>
    <tr>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
    </tr>
</table>
