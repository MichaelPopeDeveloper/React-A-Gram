import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';

const mapStateToProps = state => {
    return { state };
};

function mapDispatchToProps(dispatch) {
    return {
        // logout: action => dispatch(logoutUser(action))
    };
}

class CreatePost extends Component {
    render() {
        return (
            <div>
                <Titlebar />
                <div className="row">
                    <div className="col d-flex flex-column justify-content-center align-items-center" id="CreatePostWrapper">
                        <div className="shadow w-75 create-post-panel">
                            <h1>Create post</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);