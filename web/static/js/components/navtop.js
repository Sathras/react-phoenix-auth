import React from "react"
import InputElement from "./formInput"

class NavTop extends React.Component {

  constructor(props) {
    super(props);

    this.changeMode   = this.changeMode.bind(this);
    this.changeField  = this.changeField.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.error = {
      username :
        `Only one special char (._-) allowed and it must not be at the extremas of the string.
        The first character cannot be a number.
        All the other characters allowed are letters and numbers.
        The total length must be between 3 and 20 characters.`,
      name : `Your name can have a maximum length of 50 characters.`,
      email : 'Please enter a valid email address.',
      password : 'Must contain between 8 and 100 characters and at least a letter and a number.',
      password2 : 'Your passwords do not match.'
    }

    this.validationRegex = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/,
      username: /^(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/
    }

    var fields = this.props.fields
    fields.email.valid = (fields.email.error == "" && fields.email.value.length > 0) ? true : false
    fields.password.valid = (fields.password.error == "" && fields.password.value.length > 0) ? true : false
    fields.username.valid = (fields.username.error == "" && fields.username.value.length > 0) ? true : false
    fields.name.valid = (fields.name.error == "") ? true : false

    this.state = Object.assign(fields, {
      modal     : null,
      password2 : { valid: false, value: "", error: "" },
      // modal     : (this.props.error) ? this.props.error : false,
      submitted : (this.props.error) ? true : false
    })

  }

  componentDidUpdate(){
    if(!this.state.submitted && this.state.modal && this.state.email.value === '')
    document.getElementById("email").focus();
  }

  changeMode(e, mode){
    e.preventDefault()
    this.setState({ modal : mode })
  }

  // change form field and validation status
  changeField (e) {
    switch(e.target.id){

      case 'email':
        this.setState({ email : {
            value : e.target.value,
            valid : e.target.value.match(this.validationRegex.email) || false
        }}); break;

      case 'password':
        this.setState({
          password : {
            value : e.target.value,
            valid : e.target.value.match(this.validationRegex.password) || false
          },
          password2 : {
            value : this.state.password2.value,
            valid : false
          }
        }); break;

      case 'username':
        this.setState({ username : {
            value : e.target.value,
            valid : e.target.value.match(this.validationRegex.username) || false
        }}); break;

      case 'name':
        this.setState({ name : {
            value : e.target.value,
            valid : (e.target.value.length <= 50) ? true : false
        }}); break;

      case 'password2':
        this.setState({ password2 : {
            value : e.target.value,
            valid : (e.target.value === this.state.password.value) ? true : false
        }}); break;
    }
  }

  switchPage(e){
    e.preventDefault()
    this.props.switchPage()
  }

  validateForm (e){

    e.preventDefault();

    if(this.state.email.valid && this.state.password.valid && (
      this.state.modal === 'signin' ||
      this.state.password2.valid &&
      this.state.username.valid &&
      this.state.name.valid)
    )
      document.getElementById('authForm').submit()
    else
      this.setState({ submitted: true })
  }

  render (){

    var authLink = (this.props.user)
      ? <li><a href="/signout">Logout</a></li>
      : <li><a href="/signin" onClick={(e) => this.changeMode(e, false)}>Login</a></li>

    var regLink = (!this.props.user)
      ? <li><a href="/signup" onClick={(e) => this.changeMode(e, true)}>Register</a></li>
      : null

    var error = null
    if(this.props.error === 'signin'){
      error =
        <div className="alert alert-danger">
          <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> The email / password combination does not exist!
        </div>
    } else if(this.props.error === 'signup'){
      error =
        <div className="alert alert-danger">
          <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Your account could not be registered!
        </div>
    }

    // Input fields
    var InputUsername, InputName, InputPassword2
    InputUsername = InputName = InputPassword2 = null

    if(this.state.modal){
      InputUsername =
        <InputElement
          name = "username"
          form = "user"
          label = "Username*"
          placeholder = "Username"
          value = {this.state.username.value}
          valid = {this.state.username.valid}
          error = {this.error.username}
          onChange = {(e) => this.changeField(e)}
          submitted = {this.state.submitted}
        />
      InputName =
        <InputElement
          name = "name"
          form = "user"
          label = "Name"
          placeholder = "Name"
          value = {this.state.name.value}
          valid = {this.state.name.valid}
          error = {this.error.name}
          onChange = {(e) => this.changeField(e)}
          submitted = {this.state.submitted}
        />
      InputPassword2 =
        <InputElement
          name = "password2"
          form = "user"
          label = "Confirm Password*"
          type = "password"
          placeholder = "Confirm Password"
          value = {this.state.password2.value}
          valid = {this.state.password2.valid}
          error = {this.error.password2}
          onChange = {(e) => this.changeField(e)}
          submitted = {this.state.submitted}
        />
    }

    // Footer Line
    var footer = (this.state.modal)
      ? <p>
          Already have an account?
          <a onClick={(e) => this.changeMode(e, false)}> Sign in</a>
        </p>
      : <p>
          No account yet?
          <a onClick={(e) => this.changeMode(e, true)}> Register here</a>
        </p>

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#" onClick={(e) => this.switchPage(e)}>Crowd Crush</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {regLink}
            {authLink}
          </ul>
        </div>
        <div id='modal-auth' className="modal fade in" role="dialog" style={{
          display: (this.state.modal === null) ? 'none' : 'block'
        }}>

        <form
          id="authForm"
          acceptCharset="UTF-8"
          method="post"
          action={(this.state.modal) ? '/signup' : '/signin'}
          onSubmit={(e) => this.validateForm(e)}
        >

          <input name="_csrf_token" type="hidden" value={this.props.csrfToken} />
          <input name="_utf8" type="hidden" value="✓" />

          <div className={'modal-dialog ' + ((this.state.modal) ? 'modal-lg' : 'modal-sm')} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="modal-title">{(this.state.modal) ? 'Register' : 'Sign in'}</h3>
              </div>
              <div className="modal-body">
                {error}
                <div className='row'>
                  <div className={(this.state.modal) ? 'col-sm-6' : 'col-sm-12'}>
                    {InputUsername}
                    <InputElement
                      name = "email"
                      form = "user"
                      label = "Email*"
                      placeholder = "Email"
                      value = {this.state.email.value}
                      valid = {this.state.email.valid}
                      error = {this.error.email}
                      onChange = {(e) => this.changeField(e)}
                      submitted = {this.state.submitted}
                    />
                    {InputName}
                  </div>
                  <div className={(this.state.modal) ? 'col-sm-6' : 'col-sm-12'}>
                    <InputElement
                      name = "password"
                      form = "user"
                      label = "Password*"
                      placeholder = "Password"
                      type = "password"
                      value = {this.state.password.value}
                      valid = {this.state.password.valid}
                      error = {this.error.password}
                      onChange = {(e) => this.changeField(e)}
                      submitted = {this.state.submitted}
                    />
                    {InputPassword2}
                  </div>
                </div>
                {footer}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={(e) => this.changeMode(e, null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{(this.state.modal) ? 'Sign Up' : 'Sign In'}</button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </nav>
    )
  }
}

export default NavTop;