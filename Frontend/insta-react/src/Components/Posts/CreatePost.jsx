import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';
import { updateUser } from '../../actions/index'
import * as axios from 'axios';

const mapStateToProps = state => {
    return { state };
};

function mapDispatchToProps(dispatch) {
    return {
         updateUser: user => dispatch(updateUser(user))
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
            postButtonClicked: false,
            shouldUpdateUser: false,
            imageFound: '',
        }
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
        return this.setState({imageFound: 'No Images Found (Try A Different Keyword)'});
    }

    handlePostPhotoToFeed = (event) => {
        event.preventDefault();
        if (!this.state.postButtonClicked) {
            this.setState({postButtonClicked: true});
            const { selectedImageUrl, postDescriptionText } = this.state;
            axios.post('/user/createPost', { username: this.props.state.user.username, imageURL: selectedImageUrl, postDescriptionText })
                .then(result => {
                    if (result.status === 200) {
                        console.log(result);
                        const { user } = result.data;
                        this.props.updateUser(user);
                        console.log('create post user check', this.props);
                        this.setState({ postShared: true });
                    }
                })
                .catch(error => console.log(error));
        }
    }

    handlePostImageClick = (event) => {
        const selectedImageUrl = event.target.attributes.getNamedItem('data').value;
        this.setState({ selectedImageUrl, selectPhotoPanelHide: '-9999px', postPhotoPanelHide: '0px' });
        console.log(selectedImageUrl);
    }

    handleImageSearchText = (event) => {
        this.setState({ imageSearchText: event.target.value })
    }

    handlePostDescriptionText = (event) => {
        this.setState({ postDescriptionText: event.target.value })
    }


    render() {
        const { imageSearchText, postDescriptionText, selectedImageUrl, finalImageGroups, selectPhotoPanelHide, postPhotoPanelHide, postShared, imageFound } = this.state;
        if (postShared) return <Redirect to="/newsfeed" />
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
                            <div className="d-flex flex-column justify-content-start align-items-center p-5" style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'absolute', width: '100%', height: '100%', left: selectPhotoPanelHide }} id="Photo-Search-Wrapper">
                                <h1>Select a Photo to Post</h1>
                                <form className="p-4 w-100" onSubmit={this.getSearchedPhotos}>
                                    <input placeholder="Search for a photo..." className="form-control" value={imageSearchText} onChange={this.handleImageSearchText}></input>
                                </form>
                                {finalImageGroups.length > 0 ? finalImageGroups.map(image => image)
                                    : imageFound /* Fix this to only display error when request to the API has already been made */}
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-center p-5" style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'absolute', width: '100%', height: '100%', left: postPhotoPanelHide }} id="Photo-Search-Wrapper">
                                <h3>Add back button</h3>
                                <h1>Share your photo</h1>
                                <form className="p-4 w-100" onSubmit={this.handlePostPhotoToFeed}>
                                    <textarea placeholder="Description..." className="form-control" value={postDescriptionText} onChange={this.handlePostDescriptionText}></textarea>
                                    <button className="btn btn-primary p-2 m-1">Share</button>
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