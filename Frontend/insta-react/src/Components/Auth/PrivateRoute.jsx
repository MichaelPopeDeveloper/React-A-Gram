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


class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    }
  }

  // componentDidMount() {
  //    axios.get('/user')
  //     .then(result => console.log(result))
  //     .catch(error => error);
  // }

  authRender = () => {
    // axios.get('/user')
    //   .then(result => console.log(result))
    //   .catch(error => error);
    // if (this.state.user) {
      return <this.props.component {...this.props} />
    // } else {
    //   return <Redirect
    //     to={{
    //       pathname: "/login",
    //       state: { from: this.props.location }
    //     }}
    //   />
    //}
  }

  //render() {
  render() {
    return (
      <div>
        {this.authRender()}
      </div>
    )
  }

  //  if (this.state.user === 77 ? (
  //   <this.props.component {...props} />
  // ) : (
  //     <Redirect
  //       to={{
  //         pathname: "/login",
  //         state: { from: props.location }
  //       }}
  //     />
  //   )

  // }
}


export default connect(mapStateToProps)(PrivateRoute);