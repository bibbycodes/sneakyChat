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
      isAuthenticated: localStorage.getItem('isAuth')
    }
    console.log("State On Load:", this.state)
  }

  login = () => {
    this.setState({ isAuthenticated : true })
    this.forceUpdate()
    console.log("State After Login", this.state)
  }

  logout = () => {
    this.setState({isAuthenticated : false})
    this.forceUpdate()
    console.log("State On Logout:", this.state)
  }

  showConvoLink() {
    if(this.state.isAuthenticated == true) {
      console.log("hello")
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
            <LoginForm authenticate={this.login}/>}>
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
