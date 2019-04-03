import React, { Component } from 'react';
import '../../styles/app.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/index';
import * as axios from 'axios';

const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: action => dispatch(logoutUser(action))
  };
}



const TitleBar = (props) => {
  const logout = () => {
    console.log(props);
    props.logout(false); // sets user to false in redux state
    axios.get('/user/logout')
      .then(result => {
        console.log('client logout store', props);
        console.log('server response logout', result);
      })
  }

  return (
    <div>
      <div className="row fixed-top fixed-profile-row shadow m-0" id="TitleBar">
        <div className="col-1"></div>
        <div className="col-10 d-flex justify-content-center align-items-center">
          <i class="fas fa-camera-retro p-3" style={{ fontSize: '210%' }}></i>
          <h2 className="text-black text-center">React-a-gram</h2>
        </div>
        <div className="col-1 d-flex justify-content-center align-items-center">
          {/* <button onClick={logout} className="btn mr-5 btn-warning">
            Logout
          </button> */}
          <i class="fas fa-bars pr-4 profile-header-text hover-pointer"  uk-toggle="target: #offcanvas-push"></i>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);