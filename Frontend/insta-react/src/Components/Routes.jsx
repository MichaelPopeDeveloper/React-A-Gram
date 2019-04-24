import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import Home from './Home/Home';
import NewsFeed from './NewsFeed/NewsFeed'
import Profile from './Profile/Profile';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import CreatePost from './Posts/CreatePost';
import PostDisplay from './Posts/PostDisplay';
import PrivateRoute from './Auth/PrivateRoute';
import EditPost from './Posts/EditPost';
import { connect } from 'react-redux';
import { logoutUser, navigateToDisplay, navigateToEdit } from '../actions/index';
import * as axios from 'axios';
import Menu from './Menu/Menu';

const SERVER_BASE_URL = '/apps/reactagram';



const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: action => dispatch(logoutUser(action)),
    navigateToEdit: navigate => dispatch(navigateToEdit(navigate)),
    navigateToDisplay: navigate => dispatch(navigateToDisplay(navigate)),
  };
}

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
    }
  }



  componentWillMount() {
    this.auth();
    this.props.navigateToEdit(false);
    this.props.navigateToDisplay(false);
  }

  auth = () => {
    axios.get(SERVER_BASE_URL + '/user')
      .then(result => {
        console.log('res', result);
        if (result.status === 200) return this.props.login(false);
        return this.setState({ user: result.data.user });
      })
      .catch(error => this.props.logout(false)); //Display server error to user gracefully, not just keeping them logged out
  }

  render = () => {
    return (
      <Router>
        <Menu />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/createpost" component={CreatePost} />
        <PrivateRoute path="/post" component={PostDisplay} />
        <PrivateRoute path="/edit" component={EditPost} />
        <PrivateRoute path="/newsfeed" component={NewsFeed} />
        <PrivateRoute path="/profile" component={Profile} />
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);