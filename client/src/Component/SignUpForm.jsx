import React, { Component } from "react";

import Axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: " ",
      firstName: " ",
      lastName: " ",
      email: " ",
      password: " "
    };
  }

  handleSignup = event => {};
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
                this.setState({ firstName: event.target.value })
              }
            />
          </label>

          <label>
            
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              onChange={(event, value) =>
                this.setState({ lastName: event.target.value })
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
              onChange={(event, value) => this.setState({ password: value })}
            />
          </label>

          <button>Login</button>

        </form>
      </div>
    );
  }
}

export default SignUp;
