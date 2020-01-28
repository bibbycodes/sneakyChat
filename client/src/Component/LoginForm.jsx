import React, { Component } from "react";
import Axios from "axios";

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
  }

  clearForm = () => {
    this.setState({email : ""})
    this.setState({password : ""})
  }

  handleLogin = event => {
    event.preventDefault()
    let credentials = { email : this.state.email, password : this.state.password }
    
    Axios.post('/users/authenticate', credentials)
      .then(res => {
        let user = res.data.user
        if (user) {
          localStorage.setItem('isAuth', true)
          localStorage.setItem('userId', user.id)
          localStorage.setItem('username', user.username)

          this.props.setUser(user)
          this.props.authenticate()
          this.clearForm()
        }
      })
      .catch(err => console.log("Unauthorized", err))
  }

  render() {
    return (
      <div>
        <form class="login-form" onSubmit={this.handleLogin}>
          <label>
            Email
            <input
              type="text"
              placeholder="Email"
              onChange={(event) =>
                this.setState({ email: event.target.value })
              }
              value={this.state.email}
            />
          </label>

          <label>
            Password
            <input
              type="text"
              placeholder="Password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
