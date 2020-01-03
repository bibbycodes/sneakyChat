import React, { Component } from "react";

import Axios from 'axios'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleLogin = event => {
    console.log(event)
  }

  render() {
    let { email, password } = this.state
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label> Email
            <input 
              type="text" 
              placeholder="Email"
              onChange={ (event, value) => this.setState({ email : value })}
            />
          </label>

          <label> Password
            <input 
            type="text" 
            placeholder="Password"
            onChange={ (event, value) => this.setState({ password : value })}
          />
          </label>

          <button>Login!</button>
        </form>
      </div>
    )
  }
}

export default LoginForm;