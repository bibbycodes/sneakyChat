import React, { Component } from "react";
import Axios from 'axios'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient();


class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: " ",
      conversationId: 1,
      userId : 1,
      conversation: []
    };
  }

  componentDidMount() {
    Axios.get('/conversation/1')
      .then(res => {
        this.setState({conversation : res.data.conversation})
        console.log(this.state.conversation)
      })

      socket.on('new message', data => {
        this.handleIncomingMessage(data)
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.new_message;
    let conversation = this.state.conversation
    conversation.push(data)
    this.setState({
        conversation: conversation
    });

    let message_obj = {
      body: this.state.new_message,
      senderId : this.state.userId,
      conversationId : this.state.conversationId
    }

    socket.emit('send message', message_obj)
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({new_message: event.target.value});
  };

  handleIncomingMessage = message => {
    let conversation = this.state.conversation
    conversation.push(message)
    this.setState({conversation : conversation})
  }

  render() {
    const { message } = this.state;
    return (
    <div>
      <h1>Sneaky Chat</h1>
      
      {/* conversation */}
      {this.state.conversation.map((message, i) => (
        <p key={message.id}>{message.body}</p>
      ))}
      {/* End conversation */}

      {/* Form */}
      <form onSubmit={this.handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Enter Message"
            message="Your Message"
            onChange={this.handleInputChange}
            value={message}
          />
        </p>
        <button>Send Message</button>
      </form>
      {/* End Form  */}
    </div>
    );
  }
}




export default Conversation;
