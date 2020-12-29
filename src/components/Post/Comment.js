import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import { Link } from "react-router-dom";
import optionsIcon from '../../images/icons/options.png';

function Comment(props) {

    const [author, setAuthor] = useState({ profile: "" });
    const [comment, setComment] = useState({
        author: "404",
        commentText: "There are no posts to see",
        timestamp: 0,
        postId: ""
    });
    const [commentId, setCommentId] = useState(null);

    useEffect(() => {
        setCommentId(props.commentId);
    }, [props.commentId])

    useEffect(() => {
        props.getComment(commentId, setComment);
    }, [commentId])

    useEffect(() => {
        props.getUser(comment.author, setAuthor);
    }, [comment])

    const handleOptionsClicked = (temp) => {
        console.log(temp);
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
                        <img src={optionsIcon} onClick={() => handleOptionsClicked(commentId)} style={{
                            backgroundColor: "transparent",
                            position: "relative",
                            bottom: "-8px",
                            left: "100px"
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Text text={comment.commentText} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        {/*put nested comments here*/}
                        {/*comment.comments.map(comment => {
                            return (
                                <div className="commentBorder">
                                    <Comment comment={comment} getUser={props.getUser}/>
                                </div>
                            );
                        })*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
