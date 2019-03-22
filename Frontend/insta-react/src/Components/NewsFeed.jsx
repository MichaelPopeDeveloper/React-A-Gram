import React, { Component } from 'react';
import '../styles/app.css';
import Post from './Post';

class NewsFeed extends Component {
  render() {
    return (
      <div>
     <div className="row fixed-top">
        <div className="col d-flex justify-content-center align-items-center shadow" id="TitleBar">
            <h2 className="text-black text-center">React-a-gram</h2>
        </div>
      </div>
      <div style={{marginTop: '10vh'}}>
      </div>
      <Post />
      </div>
    );
  }
}

export default NewsFeed;