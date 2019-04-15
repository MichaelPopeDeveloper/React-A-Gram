import React, { Component } from 'react';
import {
  Redirect,
  Link,
} from "react-router-dom";
import * as axios from 'axios';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';

const mapStateToProps = state => {
  // return { articles: state.articles };
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      authenticated: false,
    };
    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePaswordChange = this.handlePaswordChange.bind(this);
  }

  login() {
    const { username, email, password } = this.state;
    axios.post('/user/signup', {
      username,
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        this.props.loginUser(res.data.user);
      })
      .catch(err => console.log(err));
  }


  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePaswordChange(event) {
    this.setState({ password: event.target.value });
  }


  render() {
    const { username, email, password } = this.state;
    const { user } = this.props.state;
    if (user) return <Redirect
      to={{
        pathname: "/profile",
        state: { from: this.props.location }
      }}
    />
    return (
      <div>
        <Titlebar />
        <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div style={{ marginTop: '10vh' }}></div>

            <h1 className="p-4">Signup</h1>

            <form className="shadow p-5" onSubmit={this.handleSubmit}>
            <p>Already a Member? <Link to="/login"><span className="text-secondary">Login</span></Link></p>
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input value={username} onChange={this.handleUsernameChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">email</label>
                <input value={email} onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value={password} onChange={this.handlePaswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);