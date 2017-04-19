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
import ErrorPage from "./components/error_page"
import Home from "./components/home"
import NavTop from "./components/navtop"
import Settings from "./components/settings"
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
    this.userChannel = this.props.socket.channel("user:"+ (window.userID || ""));

    this.state = {
      path : window.path,
      user : window.userID
    };
  }

  componentDidMount(){

    // join mainChannel
    this.mainChannel.join().receive("ok", (data) => this.setState(data))

    // features that get enabled when authentificated
    if (this.state.user){
      this.userChannel.join();

    }

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

  switchPage (page = "/"){
    if(page === this.state.path) return;
    // add new page to browser history api
    window.history.pushState(page, null, page);
    this.setState({path : page});
  }

  render (){

    var pageContent = null

    switch(this.state.path){

      case "":
      case "/":
        pageContent = <Home />
        break;

      case "settings":
        if(this.state.user) pageContent =
          <Settings
            userChannel = {this.userChannel}
          />
        else pageContent = <ErrorPage type="unauthorized" />
        break;

      default: pageContent = <ErrorPage type="notfound" />
    }

    return (
      <div id='app'>
        <NavTop
          csrfToken  = {this.props.csrfToken}
          error      = {this.props.error}
          fields     = {this.props.authFields}
          logout     = {this.logout}
          signIn     = {this.signIn}
          switchPage = {this.switchPage}
          user       = {this.state.user}
        />
        <div className="container">
          {pageContent}
        </div>
      </div>
    )
  }
}

let socket = new Socket( "/socket", { params: { token: window.userToken } })

ReactDOM.render(
  <App
    authFields = {window.authFields}
    error = {window.error}
    flash = {window.flash}
    socket = {socket}
    csrfToken = {window.csrfToken}
    userToken = {window.userToken}
  />, document.getElementById("react-app")
);

// var App = {
//   init : function(){
//     switch (page) {
//       case '/signIn' : console.log('Welcome'); break;
//     }
//   }
// };

// App.init();