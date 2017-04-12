import React from "react"

class NavTop extends React.Component {

  constructor(props) {
    super(props);

    this.changeMode = this.changeMode.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeName = this.changeName.bind(this);
    this.validateForm = this.validateForm.bind(this);


    this.state = {
      modal : false,         // options: register, login or false
      email     : {value: 'web@fuchsberger.us', valid: true},
      password  : {value: 'skarabaeus1', valid: true},
      password2 : {value: '', valid: false},
      username  : {value: '', valid: false},
      name      : {value: '', valid: true},
      // there has already been an attempt to submit it or form got back invalid from server
      submitted : false
    };
  }

  componentDidUpdate(){
    if(!this.state.submitted && this.state.modal && this.state.email.value === '')
    document.getElementById("auth-email").focus();
  }

  changeMode(e, mode){
    e.preventDefault()
    this.setState({ modal : mode })
  }

  changeEmail (e) {
    const match = e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.setState({
      email : {
        value : e.target.value,
        valid : (match) ? true : false
      }
    });
  }

  changePassword (e){
    // regex validation (8-100 characters, a-Z, one number and one letter)
    const match = e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/)
    this.setState({
      password : {
        value : e.target.value,
        valid : (match) ? true : false
      },
      password2 : {
        value : this.state.password2.value,
        valid : false
      }
    });
  }

  changePassword2 (e){
    this.setState({
      password2 : {
        value : e.target.value,
        valid : (e.target.value === this.state.password.value) ? true : false
      }
    });
  }

  changeUsername (e){
    const match = e.target.value.match(/^(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/)
    this.setState({
      username : {
        value : e.target.value,
        valid : (match) ? true : false
      }
    });
  }

  changeName (e){
    this.setState({
      name : {
        value : e.target.value,
        valid : (e.target.value.length <= 50) ? true : false
      }
    });
  }

  switchPage(e){
    e.preventDefault()
    this.props.switchPage()
  }

  validateForm (e){

    e.preventDefault();

    if(this.state.modal === 'login'){
      if(this.state.email.valid && this.state.password.valid)
        this.props.signIn({
          email: this.state.email.value,
          password: this.state.password.value
        })
      else
        this.setState({
          submitted: true
        });
    }

    if(this.state.modal === 'register'){
      if(
        this.state.email.valid &&
        this.state.password.valid &&
        this.state.password2.valid &&
        this.state.username.valid &&
        this.state.name.valid
      )
        this.props.signUp({
          email: this.state.email.value,
          password: this.state.password.value,
          username: this.state.username.value,
          name: this.state.name.value,
        })
      else
        this.setState({
          submitted: true
        });
    }
  }

  render (){

    var authLink = (this.props.user)
      ? <li><a href="/logout">Logout</a></li>
      : <li><a href="/login" onClick={(e) => this.changeMode(e, 'login')}>Login</a></li>

    var regLink = (!this.props.user)
      ? <li><a href="/register" onClick={(e) => this.changeMode(e, 'register')}>Register</a></li>
      : null

    var formHeadingTxt, formModeQuestion, formModeButton, formButtonTxt, classColumnSize;
    var modalClass = 'modal-dialog'

    if (this.state.modal === 'register') {
      formHeadingTxt    = 'Register'
      formModeQuestion  = 'Already have an account?'
      formModeButton    = 'Sign in'
      formButtonTxt     = 'Sign up'
      modalClass       += ' modal-lg'
      classColumnSize   = 'col-sm-6'
    } else {
      formHeadingTxt    = 'Sign in'
      formModeQuestion  = 'No account yet?'
      formModeButton    = 'Register here'
      formButtonTxt     = 'Sign in'
      modalClass       += ' modal-sm'
      classColumnSize   = 'col-sm-12'
    }

    // validation classes for form fields

    var errorUsername = '';
    var classUsernameDiv = (this.state.modal === 'register') ? 'form-group' : 'hidden';
    if(this.state.submitted){
      if(this.state.username.valid) classUsernameDiv += ' has-success'
      else {
        classUsernameDiv += ' has-error';
        errorUsername =
          `Only one special char (._-) allowed and it must not be at the extremas of the string.
          The first character cannot be a number.
          All the other characters allowed are letters and numbers.
          The total length must be between 3 and 20 characters.`;
      }
    }

    var errorName = '';
    var classNameDiv = (this.state.modal === 'register') ? 'form-group' : 'hidden';
    if(this.state.submitted){
      if(this.state.name.valid) classNameDiv += ' has-success'
      else {
        classNameDiv += ' has-error';
        errorName = `Your name can have a maximum length of 50 characters.`;
      }
    }

    var errorEmail = '';
    var classEmailDiv = 'form-group';
    if(this.state.submitted){
      if(this.state.email.valid) classEmailDiv += ' has-success'
      else {
        classEmailDiv += ' has-error';
        errorEmail = 'Please enter a valid email address.'
      }
    }

    var errorPassword = '';
    var classPasswordDiv = 'form-group';
    if(this.state.submitted){
      if(this.state.password.valid) classPasswordDiv += ' has-success'
      else {
        classPasswordDiv += ' has-error';
        errorPassword = 'Must contain between 8 and 100 characters and at least a letter and a number.'
      }
    }

    var errorPassword2 = '';
    var classPassword2Div = (this.state.modal === 'register') ? 'form-group' : 'hidden';
    if(this.state.submitted){
      if(this.state.password2.valid) classPassword2Div += ' has-success'
      else {
        classPassword2Div += ' has-error';
        errorPassword2 = 'Your passwords do not match.'
      }
    }

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
          display: (this.state.modal) ? 'block' : 'none'
        }}>
          <div className={modalClass} role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="modal-title">{formHeadingTxt}</h3>
              </div>
              <form onSubmit={(e) => this.validateForm(e)}>
                <div className="modal-body">
                    <p id='authFeedback' className="text-danger"></p>
                  <div className='row'>
                    <div className={classColumnSize}>
                      <div className={classUsernameDiv}>
                        <label className="control-label" htmlFor="auth-username">Username*</label>
                        <input
                          id="auth-username"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={this.state.username.value}
                          onChange={this.changeUsername}
                        />
                        <span className="help-block">{errorUsername}</span>
                      </div>

                      <div className={classEmailDiv}>
                        <label className="control-label" htmlFor="auth-email">Email*</label>
                        <input
                          id="auth-email"
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          value={this.state.email.value}
                          onChange={this.changeEmail}
                        />
                        <span className="help-block">{errorEmail}</span>
                      </div>

                      <div className={classNameDiv}>
                        <label className="control-label" htmlFor="auth-name">Name</label>
                        <input
                          id="auth-name"
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={this.state.name.value}
                          onChange={this.changeName}
                        />
                        <span className="help-block">{errorName}</span>
                      </div>
                    </div>
                    <div className={classColumnSize}>
                      <div className={classPasswordDiv}>
                        <label className="control-label" htmlFor="auth-password">Password*</label>
                        <input
                          id="auth-password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password.value}
                          onChange={this.changePassword}
                          autoComplete="off"
                        />
                        <span className="help-block">{errorPassword}</span>
                      </div>
                      <div className={classPassword2Div}>
                        <label className="control-label" htmlFor="auth-password2">Confirm Password*</label>
                        <input
                          id="auth-password2"
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={this.state.password2.value}
                          onChange={this.changePassword2}
                          autoComplete="off"
                        />
                        <span className="help-block">{errorPassword2}</span>
                      </div>
                    </div>
                  </div>
                    <p>{formModeQuestion} <a onClick={(e) => this.changeMode(e,
                      (this.state.modal === 'register') ? 'login' : 'register')}>
                      {formModeButton}</a>
                    </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={(e) => this.changeMode(e, false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{formButtonTxt}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavTop;