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
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {  
      isAuthenticated: localStorage.getItem('isAuth')
    }
    console.log("State On Load:", this.state)
  }

  handleLogin = () => {
    this.setState({ isAuthenticated : true })
    this.forceUpdate()
    console.log("State After handleLogin", this.state)
  }

  handleLogout = () => {
    this.setState({isAuthenticated : false})
    this.forceUpdate()
    console.log("State On Logout:", this.state)
  }

  showConvoLink = () =>  {
    console.log("checking if logged in, isAuthenticated:", this.state.isAuthenticated)
    if(this.state.isAuthenticated === true) {
      return(
        <li><Link to='/conversation/'>Conversation</Link></li>
      )
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/users/register/">SignUp</Link>
          <Route path="/users/register/" component={SignUpForm}></Route>
        </div>
        <div>
          <li><Link to="/authenticate">Login</Link></li>
          { this.showConvoLink() }
          <Route path='/authenticate' component={() => 
            <LoginForm authenticate={this.handleLogin}/>}>
          </Route>
          <Route path='/conversation/' component={() => 
            <Conversation isAuth={this.state.isAuthenticated}/>}>
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
