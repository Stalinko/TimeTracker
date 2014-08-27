<div class="row-fluid enter-form">
    <div class="span2 offset5 form-horizontal">
    <form method="POST">
        <fieldset>
            <legend>Sign Up / Login</legend>
            <div class="control-group">
                <span class="help-block">If you don't have an account yet, it will be automatically created</span>
            </div>
            <div class="control-group @if($errors->has('email')) error @endif">
                <input type="text" placeholder="Email…" name="email" class="span12" value="{{{ Input::old('email') }}}">
                <span class="help-inline">{{{ $errors->first('email') }}}</span>
            </div>
            <div class="control-group @if($errors->has('password')) error @endif">
                <input type="password" placeholder="Password…" name="password" class="span12">
                <span class="help-inline">{{{ $errors->first('password') }}}</span>
            </div>
            <div class="control-group">
                <label class="checkbox">
                    <input type="checkbox"> Remember me
                </label>
            </div>
            <div class="control-group text-center">
                <button type="submit" class="btn btn-success btn-large">Enter!</button>
            </div>
        </fieldset>
    </form>
    </div>
 </div>