import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div className="message-bubble">
        {/* <div className={`outer-${this.props.className}`}> */}
          <div className={`inner-${this.props.className}`}>
            <p className={`para-${this.props.className}`}> {this.props.data.senderName} : {this.props.data.body} </p>
          </div>
        {/* </div> */}
      </div>
    )
  }
}

export default Message;