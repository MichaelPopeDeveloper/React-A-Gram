import React, { Component } from 'react';
import '../../styles/app.css';

class Login extends Component {
  render() {
    return (
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div style={{marginTop: '10vh'}}></div>

          <form className="shadow p-5">
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>

        </div>
      </div>
    );
  }
}

export default Login;