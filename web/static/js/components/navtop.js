import React from "react"

class NavTop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token : window.token
    };
  }

  switchPage(event, page){
    event.preventDefault();
    this.props.switchPage(page);
  }

  render (){

    var authLink = (this.props.user)
      ? <li><a href="/logout">Logout</a></li>
      : <li><a href="/login" onClick={(event) => this.switchPage(event, '/login')}>Login</a></li>;

    var regLink = (this.props.user)
      ? <li><a href="/register" onClick={(event) => this.switchPage(event, '/register')}>Logout</a></li>
      : null;

    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <ul className="nav navbar-nav navbar-right">
            {authLink}
            {regLink}
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavTop;