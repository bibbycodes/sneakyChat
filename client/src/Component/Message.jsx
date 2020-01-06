import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.setState({className: this.handleClassName(this.props.data)})
  }

  handleClassName = message => {
    if (message.sender_id.toString() == localStorage.userId) {
      return "sent"
    } else {
      return "received"
    }
  }

  render(){
    return(
      <div className="message-bubble">
          <p>{this.props.data.username}   </p> 
          <div className={`inner-${this.state.className}`}>
            <p className={`text-${this.state.className}`}> {this.props.data.body} </p>
          </div>
      </div>
    )
  }
}

export default Message;