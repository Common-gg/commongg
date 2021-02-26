import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import { Link } from "react-router-dom";
import optionsIcon from '../../images/icons/options.png';
import CommentFooter from './CommentFooter.js';
import TruncateText from '../TruncateText.js';

function Comment(props) {

    const [author, setAuthor] = useState({ profile: "" });
    const [comment, setComment] = useState({
        author: "404",
        commentText: "There are no posts to see",
        timestamp: 0,
        postId: ""
    });
    const [commentId, setCommentId] = useState(null);
    const [deleteStarted, setDeleteStarted] = useState(0);

    useEffect(() => {
        setCommentId(props.commentId);
    }, [props.commentId])

    useEffect(() => {
        props.getComment(commentId, setComment);
    }, [commentId])

    useEffect(() => {
        props.getUser(comment.author, setAuthor);
    }, [comment])

    //create maping of emote with a list of the users who reacted
    function reactionMap() {
        let map = new Map();
        const reacted = comment.reacted;
        if (reacted) {
            for (const user in reacted) {
                const reaction = reacted[user];
                if (map.has(reaction)) {
                    map.get(reaction).push(user);
                } else {
                    map.set(reaction, [user])
                }
            }
        }
        return map
    }

    function handleShowReactions() {
        //show the modal and then set the current reactions
        props.setShowReactionsModal(true);
        //calculate the reaction mapping and set it to modal content
        props.setReactionsModalContent(reactionMap());
    }

    function checkOptions() {
        let modLvl;
        if (!props.currentUserId || !props.currentUserInfo.moderationLevel) {
            modLvl = 0;
        } else {
            modLvl = props.currentUserInfo.moderationLevel;
        }
        return (
            <div>
                <div id="dropdownMenuButton"
                    className="btn"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ background: "transparent" }}>
                    <img src={optionsIcon}
                        alt={"options"}
                        style={{
                            backgroundColor: "transparent",
                            marginTop: "-1rem",
                            marginRight: "-18rem"
                        }} />
                </div>
                <div className="dropdown-menu-right dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{
                        backgroundColor: "#BF9AFC",
                        marginTop: "-1rem",
                        marginRight: "-18rem"
                    }}>
                    {props.currentUserId === comment.author || modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => handleDeleteClicked(commentId, comment.postId)} style={{ cursor: "pointer" }}>Delete Comment</p> : null}
                    <p className="dropdown-item mb-0" onClick={() => handleShowReactions()} style={{ cursor: "pointer" }}>Reactions</p>
                    {props.currentUserId && props.currentUserId !== comment.author ? <p className="dropdown-item mb-0" onClick={() => props.report("content/comments", commentId)} style={{ cursor: "pointer" }}>Report Comment</p> : null}
                    {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.clearReports("content/comments", commentId)} style={{ cursor: "pointer" }}>Clear Reports (Current: {comment.reports ? comment.reports : 0})</p> : null}
                </div>
            </div>
        )
    };

    const handleDeleteClicked = (tempCommentId, tempPostId) => {
        //each comment delete can once be triggered once
        if (deleteStarted === 0) {
            props.deleteComment(tempCommentId, tempPostId);
            document.body.click();
            props.updateRefresh();
        }
        setDeleteStarted(deleteStarted + 1)
    }

    return (
        <div className="Comment">
            <div className="container">
                <div className="row">
                    <Link to={"/profile/" + author.username} className="col-8 row">
                        <div className="col-1">
                            <ProfilePicture user={{ ...author, id: comment.author }} width="40px" height="40px" />
                        </div>
                        <div className="col-11 row" style={{ marginBottom: '5px', lineHeight: '4px' }}>
                            <div className="col-1"></div>
                            <div className="col-10">
                                <br />
                                <br />
                                <Text text={author.username} />
                                <Text text={new Date(props.convertTimeStamp(comment.timestamp)).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.convertTimeStamp(comment.timestamp)).toLocaleDateString("en-US")}
                                    style={{ color: '#BF9AFC', fontSize: '12px' }}
                                />
                            </div>
                        </div>
                    </Link>
                    <div className="col-4">
                        {checkOptions()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {/*<Text text={comment.commentText} style={{ whiteSpace: "pre-wrap" }} />*/}
                        <TruncateText text={comment.commentText} maxLines={5} maxChars={300} />
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
