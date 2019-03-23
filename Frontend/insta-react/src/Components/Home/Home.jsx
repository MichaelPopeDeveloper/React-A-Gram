import React, { Component } from 'react';
import '../../styles/app.css';
import Login from '../Login/Login';
import TitleBar from '../TitleBar/Titlebar';

class Home extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Login />
      </div>
    );
  }
}

export default Home;