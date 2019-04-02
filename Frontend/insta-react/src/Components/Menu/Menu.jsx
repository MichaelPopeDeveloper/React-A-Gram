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



const Menu = (props) => {
  const logout = () => {
    console.log(props);
    props.logout(false); // sets user to false in redux state
    axios.get('/user/logout')
    .then(result => {
      console.log('client logout store', props);
      console.log('server response logout', result);
    })
  }

  return (
   <div className="menu" id="offcanvas-push" uk-offcanvas="mode: push; overlay: true; flip: true">
    <div class="uk-offcanvas-bar bg-white p-0">
        {/* <button class="uk-offcanvas-close" type="button" uk-close></button> */}
        <ul className="pl-3 mt-5" id="menu-items">
          <li>Create Post</li>
          <li>Newsfeed</li>
          <li onClick={logout} uk-toggle="target: #offcanvas-push">Logout</li>
        </ul>


    </div>
</div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);