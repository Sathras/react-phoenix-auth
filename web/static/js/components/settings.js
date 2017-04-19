import React from "react"
import InputElement from "./formInput"

class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.changeField  = this.changeField.bind(this);
    this.submitChange = this.submitChange.bind(this);

    this.error = {
      oldPassword : 'Please enter your current password.',
      newPassword : 'Must contain between 8 and 100 characters and at least a letter and a number.',
      newPassword2 : 'Your passwords do not match.',
      newEmail : 'Please enter a valid email address.'
    }

    this.validationRegex = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/,
    }

    this.state = {
      infoMsg: null,
      errorMsg: null,
      submitted: false,
      oldPassword   : {value: "", valid: false},
      newPassword   : {value: "", valid: true},
      newPassword2  : {value: "", valid: true},
      newEmail      : {value: "", valid: true}
    }
  }

  // change form field and validation status
  changeField (e) {

    var state = Object.assign(this.state)

    switch(e.target.id){

      case 'oldPassword':
        state.oldPassword = {
            value : e.target.value,
            valid : (e.target.value.match(this.validationRegex.password)) ? true : false
        }; break;

      case 'newPassword':
        if(e.target.value.length === 0) {
          state.newPassword = {
            value : "",
            valid : true
          }
          state.newPassword2 = {
            value : state.newPassword2.value,
            valid : (e.target.value === this.state.newPassword2.value) ? true : false
          }
        }
        else
          state.newPassword = {
            value : e.target.value,
            valid : (e.target.value.match(this.validationRegex.password)) ? true : false
          }
          state.newPassword2 = {
            value : this.state.newPassword2.value,
            valid : (e.target.value === this.state.newPassword2.value) ? true : false
          }
        break

      case 'newPassword2':
        if(e.target.value.length === 0)
          state.newPassword2 = {
            value : "",
            valid : (e.target.value === this.state.newPassword.value) ? true : false
          }
        else
          state.newPassword2 = {
            value : e.target.value,
            valid : (e.target.value === this.state.newPassword.value) ? true : false
          }
        break

      case 'newEmail':
        if(e.target.value.length === 0)
          state.newEmail = {
            value : "",
            valid : true
          }
        else
          state.newEmail = {
            value : e.target.value,
            valid : (e.target.value.match(this.validationRegex.email)) ? true : false
          }
          break
    }
    this.setState(state)
  }

  submitChange (e){
    e.preventDefault();

    var state = Object.assign(this.state)
    state.submitted = true
    state.infoMsg = state.errorMsg = null

    if(state.newPassword.value.length === 0 && state.newEmail.value.length == 0)
      state.errorMsg = `You have provided neither a new password nor a new email address`

    else if (!state.oldPassword.valid  || !state.newPassword.valid
          || !state.newPassword2.valid || !state.newEmail.valid )
      state.errorMsg = `Please check the errors below:`

    // if all went well push to server and attempt to alter
    if(!state.errorMsg){
      state.infoMsg = "Please wait..."

      var data = { oldPassword : state.oldPassword.value }
      if (state.newPassword.value.length > 0) data.password = state.newPassword.value
      if (state.newEmail.value.length > 0) data.email = state.newEmail.value

      console.log(state)

      this.props.userChannel.push("changeUserSettings", data)
        .receive('ok', () => this.setState({infoMsg:"Congrats everything is fine!"}))
    }

    this.setState(state);
  }

  render(){

    var errorMsg = (this.state.errorMsg)
      ? <div className="alert alert-danger">
          <span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> {this.state.errorMsg}
        </div>
      : null;

    var infoMsg = (this.state.infoMsg)
      ? <div className="alert alert-info">
          <span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> {this.state.infoMsg}
        </div>
      : null;

    return(
      <div className="col-sm-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Change Password</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={(e) => this.submitChange(e)}>
              {infoMsg}
              {errorMsg}

              <InputElement
                name = "oldPassword"
                label = "Old Password*"
                placeholder = "Old Password"
                type = "password"
                value = {this.state.oldPassword.value}
                valid = {this.state.oldPassword.valid}
                error = {this.error.oldPassword}
                onChange = {(e) => this.changeField(e)}
                submitted = {this.state.submitted}
              />

              <InputElement
                name = "newPassword"
                label = "New Password"
                placeholder = "New Password OR leave blank"
                type = "password"
                value = {this.state.newPassword.value}
                valid = {this.state.newPassword.valid}
                error = {this.error.newPassword}
                onChange = {(e) => this.changeField(e)}
                submitted = {this.state.submitted}
              />

              <InputElement
                name = "newPassword2"
                label = "Confirm new Password"
                placeholder = "Confirm Password OR leave blank"
                type = "password"
                value = {this.state.newPassword2.value}
                valid = {this.state.newPassword2.valid}
                error = {this.error.newPassword2}
                onChange = {(e) => this.changeField(e)}
                submitted = {this.state.submitted}
              />

              <InputElement
                name = "newEmail"
                label = "New Email"
                placeholder = "New Email OR leave blank"
                value = {this.state.newEmail.value}
                valid = {this.state.newEmail.valid}
                error = {this.error.newEmail}
                onChange = {(e) => this.changeField(e)}
                submitted = {this.state.submitted}
              />

              <button className='btn btn-primary' type='submit'>Change Password / Email</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings