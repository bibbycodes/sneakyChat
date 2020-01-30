import React, { Component } from "react";
import Axios from "axios";
import socketIOClient from "socket.io-client";
import Message from "./Message";
const socket = socketIOClient();

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: "",
      conversationId: 1,
      userId: localStorage.getItem("userId"),
      conversation: []
    };
  }

  componentDidMount() {
    Axios.get(`/conversation/${this.state.conversationId}`).then(res => {
      this.setState({ conversation: res.data.conversation });
    });

    socket.on("new message", data => {
      this.handleIncomingMessage(data);
    });
  }

  clearForm = () => {
    this.setState({ new_message: "" });
  };

  handleSubmit = event => {
    event.preventDefault();

    let data = this.state.new_message;
    let allMessages = this.state.conversation;
    // allMessages.push(data); BUGGGGGGGGG

    this.setState({
      conversation: allMessages
    });

    let message_obj = {
      body: data,
      username: localStorage.getItem("username"),
      senderName: localStorage.getItem("userFirst"),
      sender_id: localStorage.getItem("userId"),
      conversationId: this.state.conversationId
    };
    console.log("l", localStorage);

    socket.emit(`send message`, message_obj);
    this.clearForm();
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ new_message: event.target.value });
  };

  
  handleIncomingMessage = message => {
    let allMessages = this.state.conversation;
    allMessages.push(message);
    this.setState({ conversation: allMessages });
    console.log("I", message);
  };

  render() {
    const { message } = this.state;
    if (this.props.isAuthenticated) {
      return (
        <div>
          {this.state.conversation.map(message => (
            <Message data={message} />
          ))}
          <form class="Conversation" onSubmit={this.handleSubmit}>
            <p>
              <input
                type="text"
                placeholder="Enter Message"
                message="Your Message"
                onChange={this.handleInputChange}
                value={this.state.new_message}
              />
            </p>
            <button>Send Message</button>
          </form>
        </div>
      );
    } else {
      return <div>You Must be logged in to view this page</div>;
    }
  }
}

export default Conversation;
