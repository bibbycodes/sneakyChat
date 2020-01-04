import React, { Component } from "react";
import Axios from "axios";
import socketIOClient from "socket.io-client";
import Message from "./Message"
const socket = socketIOClient();

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: " ",
      conversationId: 1,
      userId: localStorage.getItem('userId'),
      conversation: []
    };
  }

  componentDidMount() {
    Axios.get(`/conversation/${this.state.conversationId}`).then(res => {
      console.log(res.data)
      this.setState({ conversation: res.data.conversation });
    });

    socket.on("new message", data => {
      this.handleIncomingMessage(data);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.new_message;
    let allMessages = this.state.conversation;
    allMessages.push(data);

    this.setState({
      conversation: allMessages
    });

    let message_obj = {
      body: data,
      senderName: localStorage.getItem("userFirst"),
      senderId: localStorage.getItem("userId"),
      conversationId: this.state.conversationId
    };

    console.log(message_obj)

    socket.emit(`send message`, message_obj);
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ new_message: event.target.value });
  };

  handleIncomingMessage = message => {
    let allMessages = this.state.conversation;
    allMessages.push(message);
    this.setState({ conversation: allMessages });
  };

  handleMessageClassName = message => {
    console.log("senderId: ", message.sender_id)
    console.log("userId: ", this.state.userId)
    console.log(localStorage)
    if (message.sender_id == this.state.userId) {
      return "sent"
    } else {
      return "received"
    }
  }

  render() {
    const { message } = this.state;
    if (this.props.isAuthenticated){
      return (
        <div>
          {this.state.conversation.map((message) => (
          <div key={message.id}>
            <Message 
            className={this.handleMessageClassName(message)} 
            data={message}
            />
          </div>
          ))}
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
        </div>
        );
    } else {
      return(
        <div>
          You Must be logged in to view this page
        </div>
      )
    }
  }
}

export default Conversation;
