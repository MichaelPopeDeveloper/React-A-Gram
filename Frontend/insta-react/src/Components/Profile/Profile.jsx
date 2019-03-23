import React, { Component } from 'react';
import '../../styles/app.css';
import Post from '../Posts/Post';

class Profile extends Component {
  render() {
    return (
      <div>
        {/* Turn into individual header component */}
        <div className="row fixed-top">
          <div className="col d-flex justify-content-between align-items-center shadow" id="ProfileTitleBar">
            <h2 className="text-black text-center pl-4 profile-header-text">RandomUser123</h2>
            <i class="fas fa-bars pr-4 profile-header-text"></i>
          </div>
        </div>
        <div style={{ marginTop: '10vh' }}>
        </div>
        <div className="row">
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="col-4 profile-col-pad">
            <div className="ProfileImageWrapper">
            <img className="img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;