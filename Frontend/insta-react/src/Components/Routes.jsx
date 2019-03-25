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

 const Routes = () => {
  return (
    <Router>
      <div>
        {/* <AuthButton /> */}
        <Route path="/home" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/newsfeed" component={NewsFeed} />
        <Route path="/profile" component={Profile} />
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

export default Routes;