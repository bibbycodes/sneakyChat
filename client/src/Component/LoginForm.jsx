import React, { Component } from "react";


import Axios from 'axios'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isAuthenticated : false
    };
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleLogin = event => {
    event.preventDefault()
    let credentials = {email : this.state.email, password : this.state.password}
    Axios.post('/users/authenticate', credentials)
      .then(res => {
        let user = res.data.user
        if (user) {
          this.props.auth()
        }
      })
      .catch(err => console.log("Unauthorized", err))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label> Email
            <input 
              type="text" 
              placeholder="Email"
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
          </label>

          <input type="submit" value="Login!"/>
        </form>
      </div>
    )
  }
}

export default LoginForm;