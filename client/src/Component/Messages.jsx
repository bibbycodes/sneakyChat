import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    console.log("Final Data is",data);
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      message: event.target.value
      // [event.target.message]: event.target.value
    });
  };

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Sneaky Chat</h1>
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
