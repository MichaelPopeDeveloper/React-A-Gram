import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import NewsFeed from './NewsFeed'

 const Routes = () => {
  return (
    <Router>
      <div>
        {/* <AuthButton /> */}

        <Route path="/" component={NewsFeed} />
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