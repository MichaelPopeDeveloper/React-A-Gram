import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../styles/app.css';
import { connect } from 'react-redux';
import { logoutUser, navigateToEdit, navigateToDisplay } from '../../actions/index';
import * as axios from 'axios';

const mapStateToProps = state => {
  return { state };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: action => dispatch(logoutUser(action)),
    navigateToEdit: navigate => dispatch(navigateToEdit(navigate)),
    navigateToDisplay: navigate => dispatch(navigateToDisplay(navigate)),
  };
}

const Menu = (props) => {

  const logout = () => {
    noNavigation();
    props.logout(false); // sets user to false in redux state
    axios.get('/user/logout')
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  const noNavigation = () => {
    props.navigateToEdit(false);
    props.navigateToDisplay(false);
  }

  return (
   <div className="menu" id="offcanvas-push" uk-offcanvas="mode: slide; overlay: true; flip: true">
    <div class="uk-offcanvas-bar bg-white p-0">
        {/* <button class="uk-offcanvas-close" type="button" uk-close></button> */}
        <ul className="pl-3 mt-5" id="menu-items">
          <Link to='/createpost' activeClassName="active" onClick={noNavigation}> <li>Create Post</li> </Link>
          <Link to='/profile' activeClassName="active" onClick={noNavigation}> <li>Profile</li> </Link>
          <Link to='/newsfeed' activeClassName="active" onClick={noNavigation}> <li>Newsfeed</li> </Link>
          <li onClick={logout} uk-toggle="target: #offcanvas-push">Logout</li>
        </ul>
    </div>
</div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);