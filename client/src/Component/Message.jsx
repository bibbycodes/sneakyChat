import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <p className={this.props.className}>{this.props.data.senderName} : {this.props.data.body} </p>
      </div>
    )
  }
}

export default Message;