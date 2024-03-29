import React, { useRef, useState, useEffect } from 'react';
import excludeIcon from "../../images/icons/exclude-1.png";
import Select from 'react-select';
import ImageIcon from "../../images/icons/image22.png";
import Compress from "compress.js";
import { Modal } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

function CreatePostModal(props) {
    const [show, setShow] = useState(false);
    const postTextRef = useRef();
    const postTitleRef = useRef();
    const fileInputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [postText, setPostText] = useState({ current: { value: "" } });
    const [selectedOption, setSelectedOption] = useState(getOptions()[0].label);
    const [isFileTooLarge, setIsFileTooLarge] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState("post");
    const [titleLength, setTitleLength] = useState(0);
    const [displayTextLengthMessage, setDisplayLengthMessage] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!show) return;
        if (!props.postId) return;
        setTitleLength(props.post.title.length);
        setPostText({ current: { value: props.post.text } });
        postTitleRef.current.value = props.post.title;
        postTextRef.current.value = props.post.text;
        if (props.post.link) setSelectedFile(props.post.link);
    }, [show])

    const buttonStyle = {
        color: "#BF9AFC",
        backgroundColor: "#2A2A2D",
        border: "2px solid #BF9AFC",
        width: "100%",
        textAlign: "left",
        borderRadius: "8px",
        cursor: "pointer"
    };
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#2A2A2D",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderBottom: "0",
    };
    const postButtonStyle = {
        height: 48,
        marginLeft: "auto",
        marginRight: "40px",
        backgroundColor: "#BF9AFC",
        color: "#2A2A2D",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px"
    };
    const fileInputImageStyle = {
        height: 48,
        backgroundColor: "transparent",
        color: "#BF9AFC",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        cursor: "pointer",
        marginRight: "20px",
        marginLeft: "40px"
    };
    const titleInputStyle = {
        color: "#BF9AFC",
        backgroundColor: "#2A2A2D",
        border: "none",
        marginTop: "none",

    };
    const textAreaStyle = {
        resize: "none",
        color: "#BF9AFC",
        backgroundColor: "#2A2A2D",
        border: "none",
        marginTop: 0,
        whiteSpace: "pre-wrap"
    };
    const dropdownStyle = {
        control: (base) => ({
            ...base,
            backgroundColor: "#2A2A2D",
            color: "#BF9AFC",
            fontSize: 16,
            border: "2px solid #BF9AFC",
            borderRadius: '8px !important',
            cursor: "pointer",
            width: "160px",
            height: "48px",
            padding: 0,
            textAlign: "center",
            backgroundColor: "transparent",
        }),
        option: (provided) => ({
            ...provided,
            color: "#BF9AFC",
            fontSize: 16,
            backgroundColor: "#2A2A2D",
            textAlign: "left",
            cursor: "pointer",
            borderBottom: '1px solid #BF9AFC',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#BF9AFC",
            fontSize: 16,
            textAlign: "center"
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#2A2A2D",
            borderRadius: '8px !important',
            textAlign: "center"
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#2A2A2D",
        })
    }

    function clearFields() {
        postTitleRef.current.value = "";
        postTextRef.current.value = "";
        fileInputRef.current.value = "";
        setLoading(false);
        setBtnText("Post");
        setSelectedFile(null);
        setShow(false);
        setTitleLength(0);
        setDisplayLengthMessage(false);
    };

    function handlePostClick() {
        let postTitleCurrentValue = postTitleRef.current.value.trim();
        let postTextCurrentvalue = postTextRef.current.value.trim();

        if ((postTitleCurrentValue.length > 150) || (postTextCurrentvalue.length > 10000)) {
            setDisplayLengthMessage(true);
            return;
        }
        if ((postTitleCurrentValue === "") && (postTextCurrentvalue === "")
            && (selectedFile === null)) {
            return;
        }

        setLoading(true);
        setBtnText("Posting...")
        if (selectedFile !== null && typeof selectedFile !== 'string') {
            props.storeImage(selectedFile, createPost);
        } else {
            let url = "";
            if (selectedFile !== null) url = selectedFile;
            createPost(url);
        }
    }

    function createPost(url) {
        props.firebaseTimeStamp(storePost);

        function storePost(timestamp) {
            let postType = getPostType();
            //find the game id by game selected
            let gameId = props.allGames.findIndex((element) => {
                return element.title === selectedOption;
            });
            let post = {
                text: postText.current.value.replace(/\n\s*\n\s*\n/g, '\n\n').trim(),
                author: props.currentUserId,
                caption: "CAPTION_TEXT",
                game: gameId.toString(),
                link: url,
                title: postTitleRef.current.value.trim(),
                type: postType,
                numComments: 0,
                category: selectedOption
            }
            if (props.postId) {
                post.timeEdited = timestamp;
            } else {
                post.timestamp = timestamp;
                post.reactions = {"Pog": 0, "KEKW": 0, "agontfHi": 0};
            }
            props.updatePost(post, props.postId);
            clearFields();
            //get the feedcontainer to update posts from db
            if (props.updatePostRefresh) {
                props.updatePostRefresh();
            }
        }
    }

    function getPostType() {
        let postTitleCurrentValue = postTitleRef.current.value;
        let postTextCurrentValue = postText.current.value;

        if (selectedFile !== null) {
            let sf = (typeof selectedFile !== 'string' ? selectedFile.type.toLowerCase() : "image/");

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

            const compress = new Compress();

            if ((file.type === "image/png") || (file.type === "image/gif")) {
                const MAX_SIZE_FOR_FILE = (5 * 1024 * 1024);

                if (file.size > MAX_SIZE_FOR_FILE) {
                    setSelectedFile(null);
                    setIsFileTooLarge(true);
                }
                else {
                    setSelectedFile(file);
                    setIsFileTooLarge(false);
                }
            }
            else {
                compress.compress([file], {
                    size: 5,
                    quality: .9,
                    maxWidth: 1200,
                    maxHeight: 675,
                    resize: true
                }).then((data) => {
                    const img = data[0];
                    let file = Compress.convertBase64ToFile(img.data, img.ext);
                    setSelectedFile(file);
                });
                setIsFileTooLarge(false);
            }
        }
        handleErrorString();
    }

    function handleErrorString() {
        if (isFileTooLarge === null || isFileTooLarge === false) {
            return null;
        }
        else if (isFileTooLarge === true) {
            return (<p style={{ color: "#F34D4D" }}>Image cannot exceed 5MB. Select a different image or shrink the currently selected image.</p>);
        }
    }

    function getOptions() {
        let tempArr = [];
        if (props.default === undefined) {
            props.currentUserInfo.games.map((game) => {
                tempArr.push({ label: props.allGames[game].title, value: game });
            });
        } else {
            tempArr.push({ label: props.allGames[props.default].title, value: props.default })
            props.currentUserInfo.games.map((game) => {
                if (game !== props.default) {
                    tempArr.push({ label: props.allGames[game].title, value: game });
                }
            });
        }

        return tempArr;
    }

    function handleOnChangeDropdown(e) {
        setSelectedOption(e.label);
    }

    function removeImage() {
        setSelectedFile(null);
    }

    //component for image preview when selectedFile is not null
    function imagePreview() {
        if (selectedFile !== null) {
            return (
                <div>
                    <hr style={{ backgroundColor: '#BF9AFC', width: '90%' }} />
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="button" style={{ color: "#BF9AFC" }} className="close"
                                aria-label="Close" onClick={() => removeImage()}>
                                <span aria-hidden="true" style={{ color: "#BF9AFC" }}>&times;</span>
                            </button>
                            <img src={(typeof selectedFile === 'string' ? selectedFile : URL.createObjectURL(selectedFile))} alt="preview"
                                style={{ maxHeight: "200px" }} />
                        </div>
                    </div>
                </div>
            )
        }
    }

    const numCharTitle = (title) => {
        setTitleLength(title.length);
    }

    return (
        <div className="CreatePostModal">
            {(!props.postId ?
                <button type="button" style={buttonStyle} className="btn btn-primary" onClick={handleShow}>
                    <Icon.PlusCircle
                        alt="post button"
                        style={{
                            width: "25px",
                            height: "25px",
                            marginRight: ".5rem"
                        }} />
                    Make a Post
                </button> :
                <p className="dropdown-item mb-0" onClick={handleShow} style={{ cursor: "pointer" }}>Edit Post</p>)}
            <Modal show={show} onHide={handleClose} onEntered={() => postTitleRef.current.focus()}>
                <div className="modal-content" style={modalContentStyle}>
                    <br />
                    <div className="col-12">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="title..."
                                maxLength="150"
                                onChange={() => numCharTitle(postTitleRef.current.value)}
                                ref={postTitleRef}
                                style={titleInputStyle}
                            />
                            <p style={{ marginRight: "10px", marginTop: "7px" }}>{titleLength + "/150"}</p>
                            <button type="button"
                                style={{ marginRight: "5px", color: "#BF9AFC" }}
                                className="close"
                                aria-label="Close"
                                onClick={() => clearFields()}>
                                <span id="createPostX" aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <hr style={{ padding: "0", backgroundColor: '#5F5177', width: '90%' }} />
                    <div className="col-12">
                        <textarea
                            className="form-control"
                            onChange={() => setPostText(postTextRef)}
                            ref={postTextRef}
                            placeholder="type your body here..."
                            rows="5"
                            maxLength="10000"
                            style={textAreaStyle}
                        />
                    </div>
                    <div>
                        <div className="d-flex justify-content-center">
                            {handleErrorString()}
                            {displayTextLengthMessage ?
                                <p style={{ color: "#F34D4D" }}>
                                    Verify the title length does not exceed 150 characters, and post body does not exceed 10000
                                </p> : null}
                        </div>
                    </div>
                    {imagePreview()}
                    <hr style={{ backgroundColor: '#5F5177', width: '90%' }} />
                    <div style={{ display: "flex" }}>
                        <input id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={fileSelectedHandler} />
                        <label htmlFor="fileInput">
                            <img style={fileInputImageStyle} src={ImageIcon}></img>
                        </label>
                        <div>
                            <Select theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    text: "#2A2A2D",
                                    primary: '#BF9AFC',
                                },
                            })}
                                styles={dropdownStyle} onChange={handleOnChangeDropdown}
                                options={getOptions()}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                defaultValue={getOptions()[0]}
                            />
                        </div>
                        <button disabled={loading}
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handlePostClick()}
                            style={postButtonStyle}>{btnText}</button>
                    </div>
                    <br />
                </div>
            </Modal>
        </div>
    );
}

export default CreatePostModal;
