import React, { useRef, useState, useEffect } from 'react';
import addcommentIcon from '../../images/icons/addcomment.png';
import { Modal } from "react-bootstrap";

function CreateCommentModal(props) {
    const [show, setShow] = useState(false);
    const commentTextRef = useRef();
    const [commentText, setCommentText] = useState({ current: { value: "" } });

    useEffect(() => {
        //if parent want the modal to show directly do it
        if (props.show === true) {
            setShow(true);
        };
    }, [props.show])

    const handleClose = () => setShow(false);

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
        textAlign: "center"
    }
    const textAreaStyle = {
        resize: "none",
        color: "#BF9AFC",
        backgroundColor: "#292833",
        borderTop: "0",
        borderLeft: "0",
        borderRight: "0",
        borderBottom: "0",
        whiteSpace: "pre-wrap"
    }
    const commentButtonStyle = {
        height: 48,
        marginLeft: "auto",
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
    }

    function handleCommentClick() {
        createComment();
    }

    function createComment() {
        props.createComment({
            author: props.currentUserId,
            commentText: commentText.current.value,
            postId: props.postId,
            timestamp: props.firebaseTimeStamp()
        }, props.post.author);
        props.updateRefresh();
        clearFields();
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
            <Modal show={show} onHide={handleClose} onEntered={() => commentTextRef.current.focus()}>
                <div className="modal-content" style={modalContentStyle}>
                    <div className="modal-header" style={modalHeaderStyle}>
                        <h5 className="modal-title" id="createCommentModalLabel">create a comment</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => clearFields()}>
                            <span aria-hidden="true" style={{color: "#BF9AFC"}}>&times;</span>
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
                    />
                     <hr style={{ padding: "0", backgroundColor: '#5F5177', width: '90%' }} />
                    <div style={{ display: "flex" }}>
                        <button type="button" className="btn btn-primary" onClick={() => handleCommentClick()} data-dismiss="modal" style={commentButtonStyle}>Comment</button>
                    </div>
                    <br />
                </div>
            </Modal>
        </div>
    )
}

export default CreateCommentModal;