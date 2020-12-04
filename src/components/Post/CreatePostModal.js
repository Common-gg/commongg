import React, { useRef, useState } from 'react';
import Text from '../Text.js';
import Image from '../Image.js';
import IconButton from '../IconButton.js';
import { render } from '@testing-library/react';


function CreatePostModal(props) {
    const [postText, setPostText] = useState("");
    const postTextRef = useRef();

    function handlePostClick() {
        props.setCreatePost({
            text: postText.current.value,
            author: props.currentUserId,
            caption: "CAPTION_TEXT",
            game: "GAME_ID",
            link: "link",
            timestamp: Date.now(),
            title: "TITLE_OF_POST",
            type: "text/image/video"
        })
    }

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
                        <textarea
                            className="form-control"
                            onChange={() => setPostText(postTextRef)}
                            ref={postTextRef}
                            rows="5"
                        />
                        <div style={{ display: "flex" }}>
                            <button type="button" className="btn btn-primary" onClick={() => handlePostClick()} data-dismiss="modal" style={{ marginLeft: "auto" }}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
