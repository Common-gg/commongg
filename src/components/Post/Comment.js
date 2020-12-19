import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import IconButton from '../IconButton.js';
import ProfilePicture from '../ProfilePicture.js';

function Comment(props) {

    const [author, setAuthor] = useState({ profile: "" });

    useEffect(() => {
        console.log(props.comment.author);
        props.getUser(props.comment.author, setAuthor);
        console.log(author);
    }, [props.comment])

    const convertNum = (val) => {
        let editedVal = val;
        if (editedVal > 1000000) {
            editedVal = Math.round(val / 100000) / 10;
            return (editedVal + "mil");
        }
        if (editedVal > 1000) {
            editedVal = Math.round(val / 100) / 10;
            return (editedVal + "k");
        } else {
            return editedVal;
        }
    }

    return (
        <div className="Comment">
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
                    </div>
                    <div className="col-11">
                        <Text text={author.profile.username} />
                        <Text text={new Date(props.comment.timestamp).toLocaleTimeString("en-US") + " - " + new Date(props.comment.timestamp).toLocaleDateString("en-US")} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Text text={props.comment.commentText} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        {/*put nested comments here*/}
                        {/*props.comment.comments.map(comment => {
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
