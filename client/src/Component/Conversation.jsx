import React, { Component } from "react";
import Axios from 'axios'
// import Navbar from "./Component/navbar";


class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: " ",
      conversationId: 1,
      userId : 1,
      messages: []
    };
  }

  componentDidMount() {
    Axios.get('/conversation/1')
      .then(res => {
        this.setState({messages : res.data.conversation})
        console.log(this.state.messages)
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.new_message;
    console.log(data)
    let allMessages = this.state.messages
    allMessages.push(data)
    this.setState({
        messages: allMessages
    });
    
    let queryString = `/messages?body=${data}&senderId=${this.state.userId}&conversationId=${this.state.conversationId}`
    Axios.post(queryString)
    .then(res => {
      console.log("Sent")
    });

  };

  handleInputChange = event => {
    event.preventDefault();
    console.log("event : ", event.target.value)
    this.setState({new_message: event.target.value});
  };

  render() {
    const { message } = this.state;
    return (
    <div>
      <h1>Sneaky Chat</h1>

      {/* Messages */}
      {this.state.messages.map((message, i) => (
        <p key={message.id}>{message.body}</p>
      ))}
      {/* End Messages */}

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
        <p>
          <button>Send Message</button>
        </p>
      </form>
      {/* End Form  */}
    </div>
    );
  }
}




export default Conversation;
