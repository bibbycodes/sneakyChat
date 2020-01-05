import React, { Component } from "react";
import Navbar from './Component/navbar';


import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginForm from "./Component/LoginForm";
import Conversation from "./Component/Conversation";
import SignUpForm from "./Component/SignUpForm";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {  
      isAuthenticated: (localStorage.getItem('isAuth') == 'true'),
    }
  }

  handleLogin = () => {
    this.setState({ isAuthenticated : true })
  }

  handleLogout = () => {
    this.setState({isAuthenticated : false})
    localStorage.setItem('isAuth', false)
    localStorage.clear()


  }

  convoLink = () =>  {
    if(this.state.isAuthenticated) {
      return(
        <Link to='/conversation/'>Conversation</Link>
      )
    }
  }

  loginLink = () => {
    if(!this.state.isAuthenticated) {
      return(
        <Link to="/authenticate">Login</Link>
      )
    }
  }

  logoutButton = () => {
    if(this.state.isAuthenticated) {
      return(
        <form onSubmit={this.handleLogout}>
          <input type="submit" value="log out"/>
        </form>
      )
    }
  }

  signupLink = () => {
    if(!this.state.isAuthenticated) {
      return(
        <Link to="/users/register/">SignUp</Link>
      )
    }
  }

  setUser = (user) =>  {
    this.setState({user : user})
  }

  componentDidMount() { //
    this.setState({user : localStorage.getItem("userId")})
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        <h1>Sneaky Chat</h1>
      <Router>
        {/* Extract to NavBar */}
        {/* renders conditionally */}
        { this.signupLink() } <br></br>
        { this.logoutButton() } <br></br>
        { this.loginLink() } <br></br>
        { this.convoLink() } <br></br>


        <Route path="/users/register/" component={SignUpForm}></Route>
        <Route path='/authenticate' component={() => 
          <LoginForm 
            authenticate={this.handleLogin}
            setUser={this.setUser}
          />
        }>
        </Route>
        <Route path='/conversation/' component={() => 
          <Conversation 
            isAuthenticated={this.state.isAuthenticated}
            user={this.state.user}
          />
        }>
        </Route>
      </Router>
      </div>
    );
  }
}

export default App;
