import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';
import * as axios from 'axios';

const mapStateToProps = state => {
  return { state };
};


class PrivateRoute extends React.Component({ component: Component, auth, ...rest }) {
constructor() {
  super();
}

componentWillMount() {
  axios.get('/user')
  .then(result => console.log(result))
  .catch(error => error);
}

  render() {
    return (
      <Route
        {...rest}
        render={props =>
          true ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  }
}
 

export default connect(mapStateToProps)(PrivateRoute);