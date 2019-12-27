import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {  
    data: null
  }

  componentDidMount() {
    // Call out fecth function below once the components mounts 
    this.callBackendAPI()
      .then(res => this.setState({data: res.express}))
      .catch(err => console.log(err));
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
  console.log("Render Return", this.state.data)



  render() { 
    return (  
      
      <div className="App">
         <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      {/* Render the newly fetched data inside of this.state.data  */}
        <p className="App-intro">{this.state.data}</p>
      
      </div>

    );
  }
}
 
export default App;


