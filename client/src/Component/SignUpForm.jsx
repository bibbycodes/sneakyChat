import React, { Component } from "react";
import Axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  }

  clearForm = () => {
    this.setState({
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    })
  }

  handleSignup = event => {
    event.preventDefault();
    let credentials = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    
    Axios.post("/users/register", credentials)
      .then(res => {
        console.log(res)
        let user = res.data.user
        localStorage.setItem('isAuth', true)
        localStorage.setItem('userId', user.id)
        localStorage.setItem('userFirst', user.first)
        this.props.setUser(user)
        this.props.authenticate()
        this.clearForm()
      })
      .catch(err => console.log("Unauthorized", err));
  };

  render() {
    return (
      <div>
        <form class="SignUp-Form"onSubmit={this.handleSignup}>
          <label>
          
          <ol>
            UserName
            <input
              type="text"
              placeholder="UserName"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
              value={this.state.username}
            />
        </ol>
          </label>

          <label>
        <ol>
            First Name
            <input
              type="text"
              placeholder="First Name"
              onChange={(event) =>
                this.setState({ firstName: event.target.value })
              }
              value={this.state.firstName}
            />
        </ol>
          </label>

          <label>
          <ol>            
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              onChange={(event) =>
                this.setState({ lastName: event.target.value })
              }
              value={this.state.lastName}
            />
          </ol>
          </label>

          <label>
          
          <ol>
            Email Address
            <input
              type="text"
              placeholder="Email Address"
              onChange={(event) =>
                this.setState({ email: event.target.value })
              }
              value={this.state.email}
            />

          </ol>
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
          <ol>
          <input type="submit" value="Sign Up" />
          </ol>
        </form>
      </div>
    );
  }
}

export default SignUp;
