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
    console.log(localStorage)
  }

  handleLogin = event => {
    event.preventDefault()
    let credentials = { email : this.state.email, password : this.state.password }
    Axios.post('/users/authenticate', credentials)
      .then(res => {
        let user = res.data.user
        if (user) {
          localStorage.setItem('isAuth', true)
          this.props.auth()
        }
      })
      .catch(err => console.log("Unauthorized", err))
  }


  handleLogout = event => {
    localStorage.setItem('isAuth', false)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label>
            {" "}
            Email
            <input
              type="text"
              placeholder="Email"
              onChange={(event, value) =>
                this.setState({ email: event.target.value })
              }
            />
          </label>

          <label>
            {" "}
            Password
            <input
              type="text"
              placeholder="Password"
              onChange={(event, value) =>
                this.setState({ password: event.target.value })
              }
            />
          </label>

          <input type="submit" value="Login!" />
        </form>

      <form onSubmit={this.handleLogout}>
      <input type="submit" value="log out"/>
      </form>
      </div>
    );
  }
}

export default LoginForm;
