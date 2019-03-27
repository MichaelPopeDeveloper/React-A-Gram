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

// const mapStateToProps = state => {
//   return { state };
// };


class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
    }
  }

  // componentDidMount() {
  //    axios.get('/user')
  //     .then(result => console.log(result))
  //     .catch(error => error);
  // }

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
    const {user} = this.state;
    if (!user) return <Redirect to="/login" />;
    return (<h1>asdfjh</h1>);
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


export default PrivateRoute; //connect(mapStateToProps)(PrivateRoute);