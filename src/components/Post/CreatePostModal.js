import React, { useEffect, useRef, useState } from 'react';
import excludeIcon from "../../images/icons/exclude-1.png";
import Select from 'react-select';
import ImageIcon from "../../images/icons/image22.png";
import Compress from "compress.js";
import { Modal } from "react-bootstrap";

function CreatePostModal(props) {
    const [show, setShow] = useState(false);
    const postTextRef = useRef();
    const postTitleRef = useRef();
    const fileInputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [postText, setPostText] = useState({ current: { value: "" } });
    const [selectedOption, setSelectedOption] = useState(getOptions()[0].label);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFileTooLarge, setIsFileTooLarge] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState("Post");
    const [titleLength, setTitleLength] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttonStyle = {
        color: "#BF9AFC",
        backgroundColor: "#292833",
        border: "2px solid #BF9AFC",
        width: "100%",
        textAlign: "left",
        borderRadius: "8px",
        cursor: "pointer"
    };
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#202020",
    };
    const modalHeaderStyle = {
        border: "none",
        textAlign: "center",
        padding: "0 !important"
    };
    const postButtonStyle = {
        height: 48,
        marginLeft: "auto",
        backgroundColor: "#BF9AFC",
        color: "#292833",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        marginRight: "40px"
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
        backgroundColor: "#202020",
        border: "none",
        marginTop: "none",

    };
    const textAreaStyle = {
        resize: "none",
        color: "#BF9AFC",
        backgroundColor: "#202020",
        border: "none",
        marginTop: 0,
        whiteSpace: "pre-wrap"
    };
    const dropdownStyle = {
        control: (base) => ({
            ...base,
            backgroundColor: "#292833",
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
            backgroundColor: "#292833",
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
            backgroundColor: "#292833",
            borderRadius: '8px !important',
            textAlign: "center"
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#292833",
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
    };

    function handlePostClick() {
        if ((postTitleRef.current.value === "") && (postTextRef.current.value === "")
            && (selectedFile === null)) {
            return;
        }
        setLoading(true);
        setBtnText("Posting...")
        if (selectedFile !== null) {
            props.storeImage(selectedFile, createPost);
        } else {
            createPost("");
        }
    }

    function createPost(url) {
        let postType = getPostType();
        //find the game id by game selected
        let gameId = props.allGames.findIndex((element) => {
            return element.title === selectedOption;
        });

        props.createPost({
            text: postText.current.value,
            author: props.currentUserId,
            caption: "CAPTION_TEXT",
            game: gameId.toString(),
            link: url,
            timestamp: props.firebaseTimeStamp(),
            title: postTitleRef.current.value,
            type: postType,
            numComments: 0,
            category: selectedOption
        });
        clearFields();
        //get the feedcontainer to update posts from db
        props.updatePostRefresh();
    }

    function getPostType() {
        let postTitleCurrentValue = postTitleRef.current.value;
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
            return (<p style={{ color: "red" }}>Image cannot exceed 5MB. Select a different image or shrink the currently selected image.</p>);
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
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <img src={URL.createObjectURL(selectedFile)} alt="preview"
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
            <button type="button" style={buttonStyle} className="btn btn-primary" onClick={handleShow}>
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
                            <button type="button" style={{ marginRight: "5px", color: "#BF9AFC" }} className="close"
                                aria-label="Close" onClick={() => clearFields()}>
                                <span id="createPostX" aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <hr style={{ padding: "0", backgroundColor: '#BF9AFC', width: '90%' }} />
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
                        </div>
                    </div>
                    {imagePreview()}
                    <hr style={{ backgroundColor: '#BF9AFC', width: '90%' }} />
                    <div style={{ display: "flex" }}>
                        <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={fileSelectedHandler} />
                        <label htmlFor="fileInput"><img style={fileInputImageStyle} src={ImageIcon}></img></label>
                        <div>
                            <Select theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    text: "#292833",
                                    primary: '#BF9AFC',
                                },
                            })}
                                styles={dropdownStyle} onChange={handleOnChangeDropdown}
                                options={getOptions()}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                defaultValue={getOptions()[0]}
                            />
                        </div>
                        <button disabled={loading} type="button" className="btn btn-primary" onClick={() => handlePostClick()} style={postButtonStyle}>{btnText}</button>
                    </div>
                    <br />
                </div>
            </Modal>
        </div>
    );
}

export default CreatePostModal;
