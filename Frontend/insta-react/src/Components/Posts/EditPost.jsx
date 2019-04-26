import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';
import { updateUser, clearEditPost, navigateToEdit } from '../../actions/index';
import * as axios from 'axios';

const SERVER_BASE_URL = '';

const mapStateToProps = state => {
    return { state };
};

function mapDispatchToProps(dispatch) {
    return {
        updateUser: user => dispatch(updateUser(user)),
        clearEditPost: () => dispatch(clearEditPost()),
        navigateToEdit: navigate => dispatch(navigateToEdit(navigate)),
    };
}

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            imageSearchText: '',
            retrievedImages: [],
            finalImageGroups: [],
            selectedImageUrl: '',
            postDescriptionText: '',
            selectPhotoPanelHide: '0px',
            postPhotoPanelHide: '9999px',
            postShared: false,
            shouldUpdateUser: false,
        }
    }

    componentDidMount() {
        this.setState({ postDescriptionText: this.props.state.postToEdit.description, selectedImageUrl: this.props.state.postToEdit.imageURL });
        console.log('edit post props', this.props);
    }

    getSearchedPhotos = (event) => {
        event.preventDefault();
        const { imageSearchText } = this.state;
        axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=18&query=${imageSearchText.replace(/\s+/g, '+')}&client_id=4c1f5525e6dcace5b7a268ca4f5ac18f69dd4b46f3b01226b4287772783938e4`)
            .then(result => {
                console.log(result)
                this.setState({ retrievedImages: result.data.results });
                this.handleRetrievedImages();
            })
            .catch(error => console.log(error));
    }

    handleRetrievedImages = () => {
        const { retrievedImages } = this.state;
        //TODO: display error to client if no images are recieved
        // Refactor the logic below for clarity
        if (retrievedImages.length > 0) {

            const groupedImages = [[]];
            retrievedImages.map((image, index) => {
                const currentImageGroup = groupedImages[groupedImages.length - 1];
                if (currentImageGroup.length < 2) {
                    currentImageGroup.push(image);
                } else {
                    groupedImages.push([]);
                    currentImageGroup.push(image);
                }
            });

            const finalImageGroups = groupedImages.map((imageGroup) => {
                return (
                    <div className="row">
                        {imageGroup.map(image => {
                            return (
                                <div className="col-4 profile-col-pad">
                                    <div className="ProfileImageWrapper">
                                        <img className="img-fluid hover-pointer" onClick={this.handlePostImageClick} src={image.urls.raw} data={image.urls.raw} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                );
            });
            return this.setState({ finalImageGroups });
        }
    }

    handlePostPhotoToFeed = (event) => {
        event.preventDefault();
        const { postDescriptionText, selectedImageUrl } = this.state;
        axios.post(SERVER_BASE_URL + '/user/editPost', { postID: this.props.state.postToEdit._id, postDescriptionText, imageURL: selectedImageUrl })
            .then(result => {
                if (result.status === 200) {
                    console.log(result);
                    const { user } = result.data;
                    this.props.updateUser(user)
                    this.props.navigateToEdit(false);
                    this.props.clearEditPost();
                    this.setState({ postShared: true });
                }
            })
            .catch(error => console.log(error));
    }

    handleDeletePost = (event) => {
        event.preventDefault();
        const { postDescriptionText, selectedImageUrl } = this.state;
        axios.post(SERVER_BASE_URL + '/user/deletePost', { postID: this.props.state.postToEdit._id, postDescriptionText, imageURL: selectedImageUrl })
            .then(result => {
                if (result.status === 200) {
                    console.log(result);
                    const { user } = result.data;
                    this.props.updateUser(user);
                    this.props.navigateToEdit(false);
                    this.props.clearEditPost();
                    console.log('eggs', this.props.state.postToEdit);
                }
            })
            .catch(error => console.log(error));
    }

    handlePostImageClick = (event) => {
        const selectedImageUrl = event.target.attributes.getNamedItem('data').value;
        this.setState({ selectedImageUrl, selectPhotoPanelHide: '-9999px', postPhotoPanelHide: '0px' });
        console.log(selectedImageUrl);
    }

    handleImageSearchText = (event) => {
        this.setState({ imageSearchText: event.target.value });
    }

    handlePostDescriptionText = (event) => {
        this.setState({ postDescriptionText: event.target.value });
    }

    render() {
        const { postDescriptionText, selectedImageUrl, postShared,  } = this.state;
        const { postToEdit } = this.props.state;
        if (!postToEdit) return <Redirect to={{
            pathname: "/newsfeed",
            state: { from: this.props.location }
        }} />;

        return (
            <div>
                <Titlebar />
                <div className="row">
                    <div style={{ minHeight: '15vh' }}>

                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex flex-column justify-content-center align-items-center" id="CreatePostWrapper">
                        <div className=" w-75 create-post-panel" style={{ overflow: 'hidden', position: 'relative' }}>
                            <div className="d-flex flex-column justify-content-start align-items-center p-5" style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'absolute', width: '100%', height: '100%', }} id="Photo-Search-Wrapper">
                                <h1>Edit Post</h1>
                                <form className="p-4 w-100" onSubmit={(event) => event.preventDefault()}>
                                    <textarea placeholder="Description..." className="form-control" value={postDescriptionText} onChange={this.handlePostDescriptionText}>Hello</textarea>
                                    <button className="btn btn-primary p-2 m-1" onClick={this.handlePostPhotoToFeed}>Share</button>
                                    <button className="btn btn-warning p-2 m-1" onClick={this.handleDeletePost}>Delete</button>
                                </form>
                                <div className="row">
                                    <div className="col">
                                        <img className="img-fluid hover-pointer" src={selectedImageUrl} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);