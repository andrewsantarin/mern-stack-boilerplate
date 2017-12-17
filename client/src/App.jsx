import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Socket from './socket/Socket';

class App extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch('/api/users')
      .then(res => res)
      //.then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Socket />
        </p>
        <p className="App-intro">
          {process.env.REACT_APP_SECRET}
        </p>
      </div>
    );
  }
}

export default App;
