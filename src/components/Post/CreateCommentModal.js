import React, { useRef, useState, useEffect } from 'react';
import addcommentIcon from '../../images/icons/addcomment.png';
import { Modal } from "react-bootstrap";

function CreateCommentModal(props) {
    const [show, setShow] = useState(false);
    const commentTextRef = useRef();
    const modalRef = useRef(null);
    const [commentText, setCommentText] = useState({ current: { value: "" } });
    const [displayCommentTextLengthValidationMessage, setDisplayCommentTextLengthValidationMessage] = useState(false);

    useEffect(() => {
        //if parent want the modal to show directly do it
        if (props.show === true) {
            setShow(true);
        };
    }, [props.show])

    let buttonStyle = {
        backgroundColor: "transparent",
        position: "relative",
        left: "-.74rem"
    }
    const modalContentStyle = {
        color: "#BF9AFC",
        backgroundColor: "#292833",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderBottom: "0",
    }
    const modalHeaderStyle = {
        borderBottom: "0 none",
        textAlign: "center",
        paddingLeft: "5%",
    }
    const textAreaStyle = {
        resize: "none",
        color: "#BF9AFC",
        backgroundColor: "transparent",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderBottom: "0",
        whiteSpace: "pre-wrap",
        paddingLeft: "5%",
        paddingRight: "5%",
        overflow: "wrap"
    }
    const commentButtonStyle = {
        height: 48,
        margin: "1%",
        marginLeft: "auto",
        marginRight: "5%",
        backgroundColor: "#BF9AFC",
        color: "#292833",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "1px",
    }

    function clearFields() {
        commentTextRef.current.value = "";
        setShow(false);
        setDisplayCommentTextLengthValidationMessage(false);
    }

    function handleCommentClick() {
        let commentTextCurrentValue = commentText.current.value.trim();

        if ((commentTextCurrentValue !== undefined) && (commentTextCurrentValue !== null) && (commentTextCurrentValue.length > 1000)) {
            setDisplayCommentTextLengthValidationMessage(true);
            return;
        }
        else if (commentTextCurrentValue === "") {
            return;
        }
        createComment();
    }

    const handleClose = () => setShow(false);

    function createComment() {
        props.createComment({
            author: props.currentUserId,
            commentText: commentText.current.value, //.replace(/\n\s*\n\s*\n/g, '\n\n').trim(),
            postId: props.postId,
            timestamp: props.firebaseTimeStamp()
        }, props.post.author);
        props.updateRefresh();
        clearFields();
    }

    function handleMouseDown(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            props.setShowClickOutsideCommentModal(true);
        }
    }

    return (
        <div className="CreateCommentModal">
            <button type="button" style={{ background: "transparent" }} id="createCommentButton" className="btn btn-primary" data-target="#createCommentModal" onClick={() => { setShow(true) }}>
                <img src={addcommentIcon}
                    style={{
                        ...buttonStyle,
                        width: "1.813rem",
                        height: "1.625rem"
                    }} />
            </button>
            <div onMouseDown={handleMouseDown} >
                <Modal show={show} onHide={handleClose} style={{ zIndex: "99998" }} onEntered={() => commentTextRef.current.focus()}>
                    <div className="modal-content" ref={modalRef} style={modalContentStyle}>
                        {displayCommentTextLengthValidationMessage ?
                            <p style={{ color: "#F34D4D" }}>
                                The length of your comment cannot exceed 1000 characters
                        </p> : null}
                        <div className="modal-header" style={modalHeaderStyle}>
                            <h5 className="modal-title" id="createCommentModalLabel">create a comment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => clearFields()}>
                                <span aria-hidden="true" style={{ color: "#BF9AFC" }}>&times;</span>
                            </button>
                        </div>
                        <hr style={{ padding: "0", backgroundColor: '#5F5177', width: '90%' }} />
                        <textarea
                            className="form-control"
                            onChange={() => setCommentText(commentTextRef)}
                            ref={commentTextRef}
                            placeholder="type your comment here..."
                            rows="5"
                            style={textAreaStyle}
                            maxLength="1000"
                        />
                        <hr style={{ padding: "0", backgroundColor: '#5F5177', width: '90%' }} />
                        <div style={{ display: "flex" }}>
                            <button type="button" className="btn btn-primary" onClick={() => handleCommentClick()} data-dismiss="modal" style={commentButtonStyle}>Comment</button>
                        </div>
                        <br />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default CreateCommentModal;