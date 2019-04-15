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

  const displayMenu = () => {
    return props.state.user ? <i class="fas fa-bars pr-4 profile-header-text hover-pointer"  uk-toggle="target: #offcanvas-push"></i> : null
 }

  return (
    <div>
      <div className="row fixed-top fixed-profile-row shadow m-0" id="TitleBar">
        <div className="col-2"></div>
        <div className="col-8 d-flex justify-content-center align-items-center">
        {/* Change to stylesheet | Remove inline style */}
          <i class="fas fa-camera-retro pr-3 mt-0 h-100 d-flex justify-content-center align-items-center title-icon"></i> 
          <h2 className="title-text text-black text-center mt-3">React-A-Gram</h2>
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center">
          {/* <button onClick={logout} className="btn mr-5 btn-warning">
            Logout
          </button> */}
          {
           displayMenu() 
          }
          
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);