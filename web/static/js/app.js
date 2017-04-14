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
import {Socket} from "phoenix"
import React from "react"
import ReactDOM from "react-dom"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
// import {Socket} from "phoenix"
import NavTop from "./components/navtop"

// import Video from "./video"

// let video = document.getElementById("video") ;

// Video.init(socket, document.getElementById("video"))

class App extends React.Component {

  constructor(props) {
    super(props);

    window.history.pushState(window.path, null, window.path);

    // enable function bindings
    this.switchPage = this.switchPage.bind(this)
    this.signIn = this.signIn.bind(this)
    this.logout = this.logout.bind(this)

    // connect socket and define mainChannel
    this.props.socket.connect()
    this.mainChannel = this.props.socket.channel("main");

    this.state = {
      path : window.path,
      user : null
    };
  }

  componentDidMount(){

    // join mainChannel
    this.mainChannel.join().receive("ok", (data) => this.setState(data))

    // enable to move forward and backward in browser history
    window.addEventListener('popstate', function(e){
      this.setState({path : e.state || '/'});
    }.bind(this));

  }

  signIn (authData){
    this.mainChannel.push("signIn", authData)
      .receive("ok", res => console.log(res))
      .receive("error", res => console.log(res))
  }

  logout(){
    this.mainChannel.push("logout")
      .receive("ok", location.reload())
  }

  switchPage (page = '/'){
    if(page === this.state.path) return;
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
          signIn     = {this.signIn}
          logout     = {this.logout}
        />
        {this.state.path}
      </div>
    )
  }
}


let socket = new Socket( "/socket", { params: { token: window.userToken } })


ReactDOM.render(
  <App
    socket = {socket}
    userToken = {window.userToken}
  />, document.getElementById("react-app")
);
