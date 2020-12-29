import React, { useEffect, useRef, useState } from 'react';
import excludeIcon from "../../images/icons/exclude-1.png";
import Select from 'react-select';
import ImageIcon from "../../images/icons/image22.png";
import Compress from "compress.js";

function CreatePostModal(props) {
    const postTextRef = useRef();
    const postTitleRef = useRef();
    const fileInputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [postTitle, setPostTitle] = useState({ current: { value: "" } });
    const [postText, setPostText] = useState({ current: { value: "" } });
    const [selectedOption, setSelectedOption] = useState(setOptions()[0].label);

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
    const modalStyle = {
        position: "absolute",
        top: "170px"
    };
    function clearFields() {
        postTitleRef.current.value = "";
        postTextRef.current.value = "";
        fileInputRef.current.value = "";
    };

    function handlePostClick() {
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
        console.log(selectedOption);
        console.log(props.allGames);

        props.createPost({
            text: postText.current.value,
            author: props.currentUserId,
            caption: "CAPTION_TEXT",
            game: gameId.toString(),
            link: url,
            timestamp: Date.now(),
            title: postTitle.current.value,
            type: postType,
            numComments: 0,
            category: selectedOption
        });
        clearFields();
        //get the feedcontainer to update posts from db
        props.updatePostRefresh();
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

            const compress = new Compress();
            console.log(file.type);
            if ((file.type === "image/png") || (file.type === "image/gif")) {
                setSelectedFile(file);
            }
            else {
                compress.compress([file], {
                    size: 4,
                    quality: .75,
                    maxWidth: 470,
                    maxHeight: 470,
                    resize: true
                }).then((data) => {
                    const img = data[0];
                    let file = Compress.convertBase64ToFile(img.data, img.ext);
                    setSelectedFile(file);
                });
            }
        }
    }
    function setOptions() {
        let tempArr = [];
        console.log(props.currentUserInfo);
        props.currentUserInfo.games.map((game) => {
            tempArr.push({ label: props.allGames[game].title, value: game });
        });
        return tempArr;
    }

    function handleOnChangeDropdown(e) {
        setSelectedOption(e.label);
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
                        <br />
                        <div className="col-12">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="title..."
                                    onChange={() => setPostTitle(postTitleRef)}
                                    ref={postTitleRef}
                                    style={titleInputStyle}
                                />
                                <button type="button" style={{ marginRight: "5px", color: "#BF9AFC" }} className="close" data-dismiss="modal" aria-label="Close" onClick={() => clearFields()}>
                                    <span aria-hidden="true">&times;</span>
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
                                style={textAreaStyle}
                            />
                        </div>
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
                                    options={setOptions()}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    defaultValue={setOptions()[0]}
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => handlePostClick()} data-dismiss="modal" style={postButtonStyle}>Post</button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostModal;
