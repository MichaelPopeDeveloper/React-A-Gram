import React, { Component } from 'react';
import '../../styles/app.css';

const TitleBar = () => {
    return (
      <div>
        <div className="row fixed-top">
          <div className="col d-flex justify-content-center align-items-center shadow" id="TitleBar">
          <i class="fas fa-camera-retro p-3" style={{fontSize: '210%'}}></i>
            <h2 className="text-black text-center">React-a-gram</h2>
          </div>
        </div>
      </div>
    );
}

export default TitleBar;