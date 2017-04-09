// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import NavTop from "./components/navtop"

// import Video from "./video"

// let video = document.getElementById("video") ;

// Video.init(socket, document.getElementById("video"))

class App extends React.Component {

  constructor(props) {
    super(props);

    // enable function bindings
    this.switchPage = this.switchPage.bind(this);
    this.logout = this.logout.bind(this);

    // define channels
    this.channelMain = socket.channel("main");

    this.state = {
      path : window.path,
      user : null
    };
  }

  componentDidMount(){
    socket.connect()

    // enable to move forward and backward in browser history
    window.addEventListener('popstate', function(e){
      this.setState({path : e.state || '/'});
    }.bind(this));

    // join base channels
    this.channelMain.join()
      .receive("ok", (data) => this.setState(data))
      .receive("error", reason => console.log("Connection to the channel could not be established: ", reason) )
  }

  logout(){
    this.channelMain.push("logout")
      .receive("ok", location.reload())
  }

  switchPage (page, overlay=false){
    if((!overlay && page === this.state.path) || (overlay && page === this.state.overlay)) return;
    // add new page to browser history api
    window.history.pushState(page, null, page);
    this.setState({path : page});
  }

  render (){

    return (
      <div id='app'>
        <NavTop
          user       = {this.state.user}
          switchPage = {this.switchPage}
          logout     = {this.logout}
        />
        {this.state.path}
      </div>
    )
  }
}


ReactDOM.render(
  <App
    userToken = {window.userToken}
  />, document.getElementById("react-app")
);
