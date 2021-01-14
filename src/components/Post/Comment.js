import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import { Link } from "react-router-dom";
import optionsIcon from '../../images/icons/options.png';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import CommentFooter from './CommentFooter.js';

function Comment(props) {

    const [author, setAuthor] = useState({ profile: "" });
    const [comment, setComment] = useState({
        author: "404",
        commentText: "There are no posts to see",
        timestamp: 0,
        postId: ""
    });
    const [commentId, setCommentId] = useState(null);

    const popoverStyle = {
        backgroundColor: "#292833",
        boxShadow: "4px 4px 25px 0px #171421 ",
        borderRadius: "20px",
        padding: "10px 20px 0px 20px",
        marginTop: "20px"
    }

    useEffect(() => {
        setCommentId(props.commentId);
    }, [props.commentId])

    useEffect(() => {
        props.getComment(commentId, setComment);
    }, [commentId])

    useEffect(() => {
        props.getUser(comment.author, setAuthor);
    }, [comment])

    const popover = (
        <Popover id={commentId + "OptionsPopover"} style={popoverStyle}>
            <Popover.Content>
                <div className="row">
                    <p onClick={() => handleDeleteClicked(commentId, comment.postId)} style={{color: "#ffffff"}}>Delete</p>
                </div>
            </Popover.Content>
        </Popover>
    );

    const checkOptions = () => {
        if (props.currentUserId === comment.author) {
            return (<OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                <img src={optionsIcon} style={{
                    backgroundColor: "transparent",
                    position: "relative",
                    bottom: "-8px",
                    left: "100px"
                }} />
            </OverlayTrigger>)
        }
    }

    const handleDeleteClicked = (tempCommentId, tempPostId) => {
        props.deleteComment(tempCommentId, tempPostId);
        document.body.click();
        props.updateRefresh();
    }

    return (
        <div className="Comment">
            <div className="container">
                <div className="row">
                    <div className="col-8 row">
                        <div className="col-1">
                            <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
                        </div>
                        <div className="col-11 row" style={{ marginBottom: '5px', lineHeight: '4px' }}>
                            <div className="col-1"></div>
                            <div className="col-10">
                                <br />
                                <br />
                                <Link to={"/profile/" + comment.author} >
                                    <Text text={author.username} />
                                </Link>
                                <Text text={new Date(comment.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(comment.timestamp).toLocaleDateString("en-US")}
                                    style={{ color: '#BF9AFC', fontSize: '12px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        {checkOptions()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Text text={comment.commentText} style={{whiteSpace: "pre-wrap"}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <CommentFooter {...props} comment={comment} commentId={commentId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
