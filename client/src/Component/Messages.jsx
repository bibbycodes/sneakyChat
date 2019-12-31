import React, { Component } from "react";
import Axios from 'axios'
// import Navbar from "./Component/navbar";


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: " ",
      user_id : 1,
      messages: []
    };
  }

  componentDidMount() {
    Axios.get('/conversation/1')
      .then(res => {
        this.setState({messages : res.data.conversation})
      })
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
