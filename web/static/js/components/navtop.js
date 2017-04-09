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
      email     : {value: '', valid: false},
      password  : {value: '', valid: false},
      password2 : {value: '', valid: false},
      username  : {value: '', valid: false},
      name      : {value: '', valid: false},
      // there has already been an attempt to submit it or form got back invalid from server
      submitted : false
    };
  }

  changeMode(e, mode){
    e.preventDefault()
    this.setState({ modal : mode })
  }

  changeEmail (e) {

    const valid = Validator.isEmail(e.target.value);

    this.setState({
      email : {
        value : e.target.value,
        valid : valid
      }
    });
  }

  changePassword (e){
    // regex validation (8-100 characters, a-Z, one number and one letter)
    this.setState({
      password : {
        value : e.target.value,
        valid : e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/)
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

    const valid = Validator.isLength(e.target.value, { min:5, max:15 })
              &&  Validator.isAlphanumeric(e.target.value);

    this.setState({
      username : {
        value : e.target.value,
        valid : valid
      }
    });
  }

  changeName (e){

    const valid = Validator.isLength(e.target.value, { min:5, max:15 })
              &&  Validator.isAlphanumeric(e.target.value);

    this.setState({
      name : {
        value : e.target.value,
        valid : valid
      }
    });
  }


  validateForm (){

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
        this.props.signUn({
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

    var formHeadingTxt, formModeQuestion, formModeButton, formButtonTxt;

    if (this.state.modal === 'register') {
      formHeadingTxt    = 'Register';
      formModeQuestion  = 'Already have an account?';
      formModeButton    = 'Sign in';
      formButtonTxt     = 'Sign up';
    } else {
      formHeadingTxt    = 'Sign in';
      formModeQuestion  = 'No account yet?';
      formModeButton    = 'Register here';
      formButtonTxt     = 'Sign in';
    }

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <ul className="nav navbar-nav navbar-right">
            {authLink}
            {regLink}
          </ul>
        </div>
        <div id='modal-auth' className="modal fade in" role="dialog" style={{
          display: (this.state.modal) ? 'block' : 'none'
        }}>
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="modal-title">{formHeadingTxt}</h3>
              </div>
              <form onSubmit={this.submitForm}>
                <div className="modal-body">
                    <p id='authFeedback' className="text-danger"></p>
                    <p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={this.state.email.value}
                        onChange={this.changeEmail}
                      />
                    </p>
                    <p>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={this.state.password.value}
                        onChange={this.changePassword}
                        required=""
                        autoComplete="off"
                      />
                    </p>
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