import React, { Component } from 'react';
import '../../styles/app.css';
import Post from '../Posts/Post';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';

const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
}

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        {/* Turn into individual header component */}
        <div className="row fixed-top fixed-profile-row ">
          <div className="col d-flex justify-content-between align-items-center shadow" id="ProfileTitleBar">
            <h2 className="text-black text-center pl-4 profile-header-text">{this.props.state.user.username}</h2>
             {/* <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push">Push</button>  */}
            <i class="fas fa-bars pr-4 profile-header-text hover-pointer"  uk-toggle="target: #offcanvas-push"></i>
          </div>
        </div>
        {/* End of header component */}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);