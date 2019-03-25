import React, { Component } from 'react';
import '../../styles/app.css';
import Login from '../Login/Login';
import TitleBar from '../TitleBar/Titlebar';
import { connect } from 'react-redux';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.articles);
  }

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