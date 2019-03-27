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


const Routes = (props) => {
  // const val = await auth();
  //console.log('response', val);
  return (
    <Router>
      <div>
        {/* <AuthButton /> */}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/newsfeed"  component={NewsFeed} />
        <PrivateRoute path="/profile"  component={Profile} />
        {/* <Route path="/notes" component={Notes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} /> */}
        {/* <PrivateRoute path="/protected" component={Admin} /> */}
      </div>
    </Router>
  );
}

class Test extends Component {
  render() {
    return (
      <h1 className="text-center">Testing! 1, 2, 3!</h1>
    );
  }
}

export default connect(mapStateToProps)(Routes);