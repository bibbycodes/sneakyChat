import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Redirect
} from "react-router-dom";

import LoginForm from './Component/LoginForm';
import Conversation from './Component/Conversation';

class App extends Component {
  constructor(props){
    super(props)

    this.authenticate = this.authenticate.bind(this)
    this.state = {  
      data: null,
      isAuthenticated: false
    }
  }


  authenticate() {
    this.setState({
      isAuthenticated : true
    })
    console.log("A", this.state)
  }

  showConvoLink() {
    if(this.state.isAuthenticated) {
      return(
        <li><Link to='/conversation/'>Conversation</Link></li>
      )
    }
  }

  componentDidMount() {
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    console.log(response);
    const body = await response.json()

    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() { 
    return (  
      <Router>
        <div>
          <ul>
            <li><Link to='/authenticate'>Login</Link></li>
            {this.showConvoLink()}
          </ul>

          <Route path='/authenticate' component={() => <LoginForm auth={this.authenticate}/>}></Route>
          <Route path='/conversation/' component={() => <Conversation/>}></Route>
        </div>
      </Router>
    )
  }
}

export default App;


