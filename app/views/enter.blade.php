<div class="row enter-form">
    <div class="col-lg-2 col-lg-offset-5 form-horizontal">
    <form method="POST">
        <fieldset>
            <legend>Sign Up / Login</legend>
            <div class="form-group">
                <span class="help-block">If you don't have an account yet, it will be automatically created</span>
            </div>
            <div class="form-group @if($errors->has('email')) has-error @endif">
                <input type="text" placeholder="Email…" name="email" value="{{{ Input::old('email') }}}" class="form-control">
                <span class="help-block">{{{ $errors->first('email') }}}</span>
            </div>
            <div class="form-group @if($errors->has('password')) has-error @endif">
                <input type="password" placeholder="Password…" name="password" class="form-control">
                <span class="help-block">{{{ $errors->first('password') }}}</span>
            </div>
            <div class="form-group">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="remember" value="1"> Remember me
                    </label>
                </div>
            </div>
            <div class="form-group text-center">
                <button type="submit" class="btn btn-success btn-large">Enter!</button>
            </div>
        </fieldset>
    </form>
    </div>
 </div>