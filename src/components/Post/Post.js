import React from 'react';
import TextPost from './TextPost.js';
import ImagePost from './ImagePost.js';
import { Link } from "react-router-dom";

function Post(props) {

    if (props.post.type === "text") {
        return (
            <div className="Post">
                <TextPost post={props.post} getUser={props.getUser} postId={props.postId}/>
                <br />
            </div>
        );
    } else if (props.post.type === "image") {
        return (
            <div className="Post">
                <ImagePost post={props.post} />
                <br />
            </div>
        );
    }
}

export default Post;
