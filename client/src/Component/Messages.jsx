import React, { Component } from "react";
// import Navbar from "./Component/navbar";


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " ",
      user_id : 1,
      messages: [
        {
          "body" : "Hello!",
          "userId" : "1",
          "conversationId" : "1"
        },
        {
          "body" : "Hi!",
          "userId" : "2",
          "conversationId" : "1"
        },
        {
          "body" : "How are you??",
          "userId" : "1",
          "conversationId" : "1"
        },
        {
          "body" : "How can you slap?!",
          "userId" : "2",
          "conversationId" : "1"
        },
        {
          "body" : "You are a blood bastard!",
          "userId" : "1",
          "conversationId" : "1"
        },
        {
          "body" : "Fucking Fuck!",
          "userId" : "2",
          "conversationId" : "1"
        },
        {
          "body" : "Fucke you!",
          "userId" : "1",
          "conversationId" : "1"
        },
        {
          "body" : "Bye!!",
          "userId" : "2",
          "conversationId" : "1"
        }
      ]
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.message;
    let msg = this.state.messages
    msg.push(data)

    this.setState({
        messages: msg
    });
    
    console.log("Final Data is", msg );

  };

  handleInputChange = event => {
    // msg = this.state.messages
    // msg.push(event.target.
     event.preventDefault();
    this.setState({
      message: event.target.value
    });
  };

  render() {
    const { message } = this.state;
    
    return (
      <div>
    <h1>Sneaky Chat</h1>

        <h1>{this.state.messages.map((item,i) => (
        <div>
        <p key={i}>{item["body"]}, {item["userId"]}</p>
        
        </div>
        ))}</h1>

        <label>Enter Message</label>
        <p>Your Message is: {message}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Your Message"
              message="Your Message"
              onChange={this.handleInputChange}
              value={message}
            />
          </p>

          <p>
            <button>Send Message</button>
          </p>
        </form>
      </div>
    );
  }
}




export default Message;
