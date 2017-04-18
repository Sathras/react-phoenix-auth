import React from "react"

class ErrorPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return <div>Error: {this.props.type}</div>
  }
}

export default ErrorPage