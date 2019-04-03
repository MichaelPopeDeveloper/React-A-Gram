import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/app.css';
import Titlebar from '../TitleBar/Titlebar';
import * as axios from 'axios';

const mapStateToProps = state => {
    return { state };
};

function mapDispatchToProps(dispatch) {
    return {
        // logout: action => dispatch(logoutUser(action))
    };
}

class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            imageSearchText: '',
            retrievedImages: [],
            finalImageGroups: [],
        }
    }

    componentDidMount() {
        this.handleRetrievedImages();
    }

    handleSubmit = (event) => {
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
                                        <img className="img-fluid hover-pointer" onClick={(event) => console.log(event.target.attributes.getNamedItem('data').value)} src={image.urls.raw} data={image.urls.raw}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                );
            });
            return this.setState({finalImageGroups});
        }
    }

    handleImageSearchText = (event) => {
        this.setState({ imageSearchText: event.target.value })
    }


    render() {
        const { imageSearchText, finalImageGroups } = this.state;
        return (
            <div>
                <Titlebar />
                <div className="row">
                <div style={{minHeight: '15vh'}}>

                </div>
                </div>
                <div className="row">
                    <div className="col d-flex flex-column justify-content-center align-items-center" id="CreatePostWrapper">
                        <div className="shadow w-75 create-post-panel d-flex flex-column justify-content-start align-items-center">
                            <form className="p-4 w-100" onSubmit={this.handleSubmit}>
                                <input className="form-control" value={imageSearchText} onChange={this.handleImageSearchText}></input>
                            </form>
                            {finalImageGroups.length > 0 ? finalImageGroups.map(image => {
                                console.log('image element', image);
                                return image;
                            }) : 'No images were found' /* Fix this to only display error when request to the API has already been made */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);