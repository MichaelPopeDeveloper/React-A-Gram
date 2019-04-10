import React, { Component, useReducer } from 'react';
import { connect } from 'react-redux';
import '../../styles/app.css';

const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    // logout: action => dispatch(logoutUser(action))
  };
}

class Post extends Component {

  mapNewsfeedPosts = () => {
    const { user } = this.props.state;
    return [...user.newsfeed].reverse().map((post, index) => {
      return (
        <div className="row">
        <div className="col d-flex flex-column justify-content-center align-items-center" id="Post">
          <div className="post-wrapper d-flex flex-column">
            <div className="w-100 d-flex flex-row justify-content-start align-items-center pt-2 mb-2" id="Author-Post-Header">
              <div className="author-post-img-wrapper d-flex justify-content-center align-items-center">
                <img className="rounded img-post img-fluid" src="https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
              </div>
              <b className="post-author-username pl-3">{user.username}</b>
            </div>
            <div className="post-img-wrapper">
              <img className="img-fluid" src={post.imageURL} />
            </div>
            <div className="w-100 d-flex flex-column justify-content-start pt-2">
              <p className="text-left pb-0 mb-0 author-description-comment" id="Author-Description"> <b className="pr-2">{post.username}</b>{post.description}</p>
              <p className="text-secondary pt-1 author-description-comment" id="Author-Description">View all comments</p>
            </div>
          </div>
        </div>
      </div>
      );
    })
  }

  render() {
    return (
      // fix image not covering entire backgrond on right side on large screens
      <div>
        {this.mapNewsfeedPosts()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);