import React, { useRef, useState } from 'react';

function CreatePostModal(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [postText, setPostText] = useState({
        current: {
            value: ""
        }
    });
    const postTextRef = useRef();

    function handlePostClick() {
        if (selectedFile !== null) {
            props.storeImage(selectedFile, createPost);
        } else {
            createPost("");
        }
    }

    function createPost(url) {
        props.setCreatePost({
            text: postText.current.value,
            author: props.currentUserId,
            caption: "CAPTION_TEXT",
            game: "GAME_ID",
            link: url,
            timestamp: Date.now(),
            title: "TITLE_OF_POST",
            type: "text/image/video",
        });
        setPostText({
            current: {
                value: ""
            }
        });
        setSelectedFile(null);
    }

    function fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            console.log(file);
            setSelectedFile(file);
        }
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
                            style={{ resize: "none" }}
                        />
                        <div style={{ display: "flex" }}>
                            <input id="fileInput" type="file" onChange={fileSelectedHandler} />
                            {/* {<input type="button" className="btn btn-primary" value="Select Image or Video" />} */}
                            <button type="button" className="btn btn-primary" onClick={() => handlePostClick()} data-dismiss="modal" style={{ marginLeft: "auto" }}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
