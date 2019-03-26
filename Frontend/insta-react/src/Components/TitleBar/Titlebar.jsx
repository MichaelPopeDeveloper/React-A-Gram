import React, { Component } from 'react';
import '../../styles/app.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/index';

const mapStateToProps = state => {
  // return { articles: state.articles };
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: action => dispatch(logoutUser(action))
  };
}

const logout = () => this.logout(false); // sets user to false in redux state

const TitleBar = () => {
    return (
      <div>
        <div className="row fixed-top">
          <div className="col d-flex justify-content-center align-items-center shadow" id="TitleBar">
          <button onClick={logout} className="btn mr-5 btn-warning">
          Logout
          </button>
          <i class="fas fa-camera-retro p-3" style={{fontSize: '210%'}}></i>
            <h2 className="text-black text-center">React-a-gram</h2>
          </div>
        </div>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);