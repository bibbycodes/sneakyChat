import React, { Component } from "react";
import Axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstname: null,
      lastname: null,
      email: null,
      password: null
    };
  }

  handleSignup = event => {
    event.preventDefault();
    let credentials = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    Axios.post("/users/register", credentials)
      .then(res => console.log(res))
      .catch(err => console.log("Unauthorized", err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignup}>
          <label>
            UserName
            <input
              type="text"
              placeholder="UserName"
              onChange={(event, value) =>
                this.setState({ username: event.target.value })
              }
            />
          </label>

          <label>
            First Name
            <input
              type="text"
              placeholder="First Name"
              onChange={(event, value) =>
                this.setState({ firstname: event.target.value })
              }
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              onChange={(event, value) =>
                this.setState({ lastname: event.target.value })
              }
            />
          </label>

          <label>
            Email Address
            <input
              type="text"
              placeholder="Email Address"
              onChange={(event, value) =>
                this.setState({ email: event.target.value })
              }
            />
          </label>

          <label>
            Password
            <input
              type="text"
              placeholder="Password"
              onChange={(event, value) =>
                this.setState({ password: event.target.value })
              }
            />
          </label>

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
