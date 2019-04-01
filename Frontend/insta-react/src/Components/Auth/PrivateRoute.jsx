import React, { Component } from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import * as axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { state };
};


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      isLoaded: false,
    }
  }

  componentWillMount() {
    this.authRender();
  }

  authRender = () => {
    axios.get('/user')
      .then(result => {
        this.setState({ user: result.data.user, isLoaded: true });
        // console.log('result private', result);
        console.log('props private', this.props)
      })
      .catch(error => error);
  }

  // authRender = () => {
  //   // axios.get('/user')
  //   //   .then(result => console.log(result))
  //   //   .catch(error => error);
  //    if (this.state.user) {
  //     console.log(this.state.user);
  //     return <Route
  //       path={this.props.path}
  //       component={this.props.component}
  //     />
  //   } 
  // }

  //render() {
  render = () => {
    const { component: Component, ...rest } = this.props;
    const { user } = this.props.state;
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? (
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
    // const { component: Component, auth, ...rest } = this.props;
    // const { user, isLoaded } = this.state;
    // if (auth) {
    //   return (
    //     <Route
    //       {...rest}
    //       render={props => {
    //         return <Component {...props} />
    //       }}
    //     />
    //   )
    // } else {
    //   return (
    //     <Redirect
    //       to={{ pathname: '/login' }}
    //     />
    //   )
    // }
    // return (<h1>asdfjh</h1>);
    // return this.authRender();
    // this.state.user ? (
    //   <Route
    //   path={this.props.path}
    //   component={this.props.component}
    //   />
    // ) : (
    //   <Redirect
    //         to={{
    //           pathname: "/login",
    //           state: { from: props.location }
    //         }}
    //       />
    // );
  }
}

const PrivateRouteStateless = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
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


export default connect(mapStateToProps)(PrivateRoute);