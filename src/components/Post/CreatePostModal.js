import React, { useRef, useState } from 'react';
import excludeIcon from "../../images/icons/exclude-1.png";

function CreatePostModal(props) {
    const postTextRef = useRef();
    const postTitleRef = useRef();
    const fileInputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [postTitle, setPostTitle] = useState({ current: { value: "" } });
    const [postText, setPostText] = useState({ current: { value: "" } });
    const buttonStyle = {
        color: "#BF9AFC",
        backgroundColor: "#292833",
        border: "2px solid #BF9AFC",
        width: "100%",
        textAlign: "left",
        borderRadius: "8px"
    };
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#202020",
        borderBottom: ""
    };
    const modalHeaderStyle = {
        borderBottom: "0 none",
        textAlign: "center"
    };
    const postButtonStyle = {
        height: 48,
        marginLeft: "auto",
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
    };
    const attachButtonStyle = {
        height: 48,
        marginRight: "auto",
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
    };
    const titleInputStyle = {
        color: "#BF9AFC",
        backgroundColor: "#202020",
        borderLeft: "0",
        borderTop: "0",
        borderRight: "0"
    };
    const textAreaStyle = {
        resize: "none",
        color: "#BF9AFC",
        backgroundColor: "#202020",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0"
    };

    const modalStyle={
        position: "absolute",
        top: "170px"
    };

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
        <div className="CreatePostModal">
            <button type="button" style={buttonStyle} className="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
                <img
                    src={excludeIcon}
                    alt="post button"
                    style={{
                        width: "40px",
                        height: "40px",
                        marginRight: ".5rem"
                    }} />
                    make a post
                </button>
            <div className="modal fade" id="createPostModal" tabIndex="-1" role="dialog" aria-labelledby="createPostModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={modalContentStyle}>
                        <div className="modal-header" style={modalHeaderStyle}>
                            <h5 className="modal-title" id="createPostModalLabel">create a post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => clearFields()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="title..."
                            onChange={() => setPostTitle(postTitleRef)}
                            ref={postTitleRef}
                            style={titleInputStyle}
                        />
                        <textarea
                            className="form-control"
                            onChange={() => setPostText(postTextRef)}
                            ref={postTextRef}
                            placeholder="type your body here..."
                            rows="5"
                            style={textAreaStyle}
                        />
                        <div style={{ display: "flex" }}>
                            <input id="fileInput" type="file" accept="video/*,image/*" style={{ display: "none" }} ref={fileInputRef} onChange={fileSelectedHandler} />
                            <label style={attachButtonStyle} htmlFor="fileInput" className="btn btn-primary">Attach Photo or Video</label>
                            <button type="button" className="btn btn-primary" onClick={() => handlePostClick()} data-dismiss="modal" style={postButtonStyle}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
