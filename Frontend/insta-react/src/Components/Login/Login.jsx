import React, { Component } from 'react';
import * as axios from 'axios';
import '../../styles/app.css';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';
import Titlebar from '../TitleBar/Titlebar';
import { withRouter } from 'react-dom';

const mapStateToProps = state => {
  // return { articles: state.articles };
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
}

class Login extends Component {
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

  componentWillMount() {
    console.log('props login', this.props);
  }

  login() {
    const { username, password } = this.state;
    axios.post('/user/login', {
      username,
      password,
    })
      .then((res) => {
        console.log(res);
        this.props.loginUser(res.data.user);
        console.log(this.props);
        //   this.setState({ name: decodedToken.name });
      })
      .catch(err => console.log(err));
  }


  handleSubmit(event) {
    event.preventDefault();
    const { username, email, password } = this.state;
    // console.log({ email, password });
    console.log('props', this.props);
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

            <h1 className="p-4">Login</h1>

            <form className="shadow p-5" onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input value={username} onChange={this.handleUsernameChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

