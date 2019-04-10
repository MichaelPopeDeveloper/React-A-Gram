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

  mapProfilePosts = () => {
    const { user } = this.props.state;
    //TODO: display error to client if no images are recieved
    // Refactor the logic below for clarity
    if (user.posts.length > 0) {

      const profilePosts = [[]];
      user.posts.map((image, index) => {
        const currentImageGroup = profilePosts[profilePosts.length - 1];
        if (currentImageGroup.length < 2) {
          currentImageGroup.push(image);
        } else {
          profilePosts.push([]);
          currentImageGroup.push(image);
        }
      });

      const finalImageGroups = profilePosts.map((imageGroup) => {
        return (
          <div className="row">
            {imageGroup.map(post => {
              return (
                <div className="col-4 profile-col-pad">
                  <div className="ProfileImageWrapper">
                  <div className="hover-pointer" 
                  style={{
                    background: `url(${post.imageURL}) no-repeat center center fixed`,
                    backgroundSize: 'conver',
                    minHeight: '10rem',
                  }}> </div>
                    {/* <img className="img-fluid hover-pointer" style={{height: 'auto', minWidth: '35rem'}} src={post.imageURL} data={post.imageURL} /> */}
                  </div>
                </div>
              )
            })}
          </div>
        );
      });
      return finalImageGroups;
    }
  }

  render() {
    return (
      <div>
        {/* Turn into individual header component */}
        <div className="row fixed-top fixed-profile-row ">
          <div className="col d-flex justify-content-between align-items-center shadow" id="ProfileTitleBar">
            <h2 className="text-black text-center pl-4 profile-header-text">{this.props.state.user.username}</h2>
            {/* <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push">Push</button>  */}
            <i class="fas fa-bars pr-4 profile-header-text hover-pointer" uk-toggle="target: #offcanvas-push"></i>
          </div>
        </div>
        {/* End of header component */}

        <div style={{ marginTop: '10vh' }}>
        </div>
        {/* <div className="row">
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
        </div> */}
        {this.mapProfilePosts()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);