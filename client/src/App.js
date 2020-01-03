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
  state = {  
    data: null
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
          <ol>
            <li><Link to='/authenticate'>Login</Link></li>
            <li><Link to='/conversation/'>Conversation</Link></li>
          </ol>

          <Route path='/authenticate' component={LoginForm}></Route>
          <Route path='/conversation/' component={Conversation}></Route>
        </div>
      </Router>
    )
  }
}

export default App;


