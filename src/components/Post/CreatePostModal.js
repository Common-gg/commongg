import React from 'react';
import Text from '../Text.js';
import Image from '../Image.js';
import IconButton from '../IconButton.js';


function CreatePostModal(props) {
    return (
        <div className="CreatePostModal">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
                Create a Post
                        </button>

            <div className="modal fade" id="createPostModal" tabIndex="-1" role="dialog" aria-labelledby="createPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createPostModalLabel">Create a Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" data-target="#createTextPostModal" >Text Post</button>
                                    </div>
                                    <div className="col-4">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Image Post</button>
                                    </div>
                                    <div className="col-4">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Video Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
