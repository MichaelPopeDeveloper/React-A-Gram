import React, { Component } from 'react';
import '../../styles/app.css';
import Post from '../Posts/Post';
import TitleBar from '../TitleBar/Titlebar';

class NewsFeed extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <div style={{ marginTop: '10vh' }}>
        </div>
        <Post />
      </div>
    );
  }
}

export default NewsFeed;