import React, { Component } from 'react';
import * as axios from 'axios';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';

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
        //   this.setState({ name: decodedToken.name });
      })
      .catch(err => console.log(err));
  }


  handleSubmit(event) {
    event.preventDefault();
    const { username, email, password } = this.state;
    // console.log({ email, password });
    this.login({ username, email, password });
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
    return (
      <div>
        <Titlebar />
     <div className="row">
        <div className="col d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div style={{ marginTop: '10vh' }}></div>

          <h1 className="p-4">Signup</h1>

          <form className="shadow p-5" onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input value={username} onChange={this.handleUsernameChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
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

export default Signup;