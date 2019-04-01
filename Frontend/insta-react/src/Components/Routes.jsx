import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Home from './Home/Home';
import NewsFeed from './NewsFeed'
import Profile from './Profile/Profile';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import PrivateRoute from './Auth/PrivateRoute';
import { connect } from 'react-redux';
import * as axios from 'axios';

const mapStateToProps = state => {
  // return { articles: state.articles };
  return { state };
};

// const auth = () => {
//   return axios.get('/user')
//     .then(result => result.data)
//     .catch(error => error);
// }


class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
    }
  }

  componentWillMount() {
    this.auth()
  }

  auth = () => {
    console.log('props routes', this.props);
    return axios.get('/user')
      .then(result => {
        this.setState({ user: result.data.user });
        console.log('result routes', result);
      })
      .catch(error => error);
  }
  // const val = await auth();
  //console.log('response', val);

  render = () => {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/newsfeed" component={NewsFeed} />
        <PrivateRoute path="/profile" component={Profile} />
      </Router>
    );
  }
}

class Test extends Component {
  render() {
    return (
      <h1 className="text-center">Testing! 1, 2, 3!</h1>
    );
  }
}

export default connect(mapStateToProps)(Routes);