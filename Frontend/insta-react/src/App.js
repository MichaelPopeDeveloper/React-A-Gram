import React, { Component } from 'react';
import Routes from './Components/Routes';

class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{padding: '0px'}}>
      <Routes />
      </div>
    );
  }
}

export default App;
