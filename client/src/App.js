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
      isAuthenticated: (localStorage.getItem('isAuth') == 'true')
    }
  }

  handleLogin = () => {
    this.setState({ isAuthenticated : true })
  }

  handleLogout = () => {
    this.setState({isAuthenticated : false})
    localStorage.setItem('isAuth', false)
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

  componentDidMount() {
  }

  render() {
    return (
      <div>
      
      <Router>
        <div>
          <Link to="/users/register/">SignUp</Link>
          <Route path="/users/register/" component={SignUpForm}></Route>
        </div>
        <div>
          { this.logoutButton() }
          { this.loginLink() }
          { this.convoLink() }
          <Route path='/authenticate' component={() => 
            <LoginForm authenticate={this.handleLogin}/>}>
          </Route>
          <Route path='/conversation/' component={() => 
            <Conversation isAuth={this.state.isAuthenticated}/>}>
          </Route>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
