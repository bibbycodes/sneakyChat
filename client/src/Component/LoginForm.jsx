import React, { Component } from "react";

import Axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
<<<<<<< HEAD
  }

  handleLogin = event => {
    console.log(event);
  };

  render() {
    let { email, password } = this.state;
=======
  }

  componentDidMount() {

  }

  handleLogin = event => {
    event.preventDefault()
    let credentials = {email : this.state.email, password : this.state.password}
    Axios.post('/users/authenticate', credentials)
      .then(res => console.log(res))
      .catch(err => console.log("Unauthorized", err))
  }

  render() {
>>>>>>> 53e651f5366ee65c055c95b4740a44f853595f31
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label>
            {" "}
            Email
            <input
              type="text"
              placeholder="Email"
<<<<<<< HEAD
              onChange={(event, value) => this.setState({ email: event.target.value })}
            />
          </label>

          <label>
            {" "}
            Password
            <input
              type="text"
              placeholder="Password"
              onChange={(event, value) => this.setState({ password: event.target.value })}
            />
=======
              onChange={(event) => {
                this.setState({ email : event.target.value })
              }}
            />
          </label>

          <label> Password
            <input 
            type="text" 
            placeholder="Password"
            onChange={(event) => {
              this.setState({ password : event.target.value })
            }}
          />
>>>>>>> 53e651f5366ee65c055c95b4740a44f853595f31
          </label>

          <input type="submit" value="Login!"/>
        </form>
      </div>
    );
  }
}

export default LoginForm;
