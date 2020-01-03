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
    console.log("C", this.state.isAuthenticated)
  }

  login = () => {
    this.setState({ isAuthenticated : true })
    this.forceUpdate()
    console.log("A", this.state)
  }

  logout = () => {
    this.setState({isAuthenticated : false})
    this.forceUpdate()
    console.log("B", this.state.isAuthenticated)
  }

  showConvoLink() {
    if(this.state.isAuthenticated == true) {
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
          <li>
            <Link to="/users/register/">SignUp</Link>
          </li>
          <Route path="/users/register/" component={SignUpForm}></Route>
        </div>

        <div>
          <ul>
            <li><Link to="/authenticate">Login</Link></li>
            <li>{ this.showConvoLink() }</li>
          </ul>

          <Route path='/authenticate' component={() => <LoginForm auth={this.login}/>}></Route>
          <Route path='/conversation/' component={() => <Conversation isAuth={this.state.isAuthenticated}/>}></Route>

        </div>
      </Router>
    );
  }
}

export default App;
