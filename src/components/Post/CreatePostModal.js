import React, { useRef, useState } from 'react';

function CreatePostModal(props) {
    const postTextRef = useRef();
    const postTitleRef = useRef();
    const fileInputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [postTitle, setPostTitle] = useState({ current: { value: "" } });
    const [postText, setPostText] = useState({ current: { value: "" } });

    function clearFields() {
        postTitleRef.current.value = "";
        postTextRef.current.value = "";
        fileInputRef.current.value = "";
    }

    function handlePostClick() {
        if (selectedFile !== null) {
            props.storeImage(selectedFile, createPost);
        } else {
            createPost("");
        }
    }

    function createPost(url) {
        let postType = getPostType();

        props.createPost({
            text: postText.current.value,
            author: props.currentUserId,
            caption: "CAPTION_TEXT",
            game: "GAME_ID",
            link: url,
            timestamp: Date.now(),
            title: postTitle.current.value,
            type: postType,
            likes: 0,
            dislikes: 0,
            numComments: 0
        });
        clearFields();
        setSelectedFile(null);
    }

    function getPostType() {
        let postTitleCurrentValue = postTitle.current.value;
        let postTextCurrentValue = postText.current.value;

        if (selectedFile !== null) {
            let sf = selectedFile.type.toLowerCase();

            if (sf.startsWith("video/")) {
                return "video";
            }
            else if (sf.startsWith("image/")) {
                return "image";
            }
        }
        if (postTitleCurrentValue !== "" || postTextCurrentValue !== "") {
            return "text";
        }
        return "";
    }


    function fileSelectedHandler(e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            console.log(file);
            setSelectedFile(file);
        }
    }

    return (
        <div className="CreatePostModal text-center">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
                Create a Post
            </button>

            <div className="modal fade" id="createPostModal" tabIndex="-1" role="dialog" aria-labelledby="createPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createPostModalLabel">Create a Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => clearFields()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            onChange={() => setPostTitle(postTitleRef)}
                            ref={postTitleRef}
                        />
                        <textarea
                            className="form-control"
                            onChange={() => setPostText(postTextRef)}
                            ref={postTextRef}
                            rows="5"
                            style={{ resize: "none" }}
                        />
                        <div style={{ display: "flex" }}>
                            <input id="fileInput" type="file" style={{ display: "none" }} ref={fileInputRef} onChange={fileSelectedHandler} />
                            <label htmlFor="fileInput" className="btn btn-primary">Attach Photo or Video</label>
                            <button type="button" className="btn btn-primary" onClick={() => handlePostClick()} data-dismiss="modal" style={{ height: 48, marginLeft: "auto" }}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
