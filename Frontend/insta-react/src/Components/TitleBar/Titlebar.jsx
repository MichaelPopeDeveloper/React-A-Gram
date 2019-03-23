import React, { Component } from 'react';
import '../../styles/app.css';

const TitleBar = () => {
    return (
      <div>
        <div className="row fixed-top">
          <div className="col d-flex justify-content-center align-items-center shadow" id="TitleBar">
            <h2 className="text-black text-center">React-a-gram</h2>
          </div>
        </div>
      </div>
    );
}

export default TitleBar;