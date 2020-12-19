import React from 'react';
import TextPost from './TextPost.js';
import ImagePost from './ImagePost.js';
import { Link } from "react-router-dom";

function Post(props) {

    const addLink = () => {
        if (props.postId !== undefined) {
            return (
                <Link to={"/post/" + props.postId} style={{ color: "#BF9AFC" }}>
                    <TextPost post={props.post} getUser={props.getUser} />
                    <br />
                </Link>
            )
        } else {
            return (
                <div>
                    <TextPost post={props.post} getUser={props.getUser} />
                    <br />
                </div>
            )
        }
    }

    if (props.post.type === "text") {
        return (
            <div className="Post">
                {addLink()}
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
