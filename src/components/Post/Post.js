import React from 'react';
import TextPost from './TextPost.js';
import ImagePost from './ImagePost.js';

function Post(props) {
    console.log(props.post)
    if (props.post.type === "text") {
        return (
            <div className="Post">
                <TextPost post={props.post} getUser={props.getUser}/>
                <br/>
            </div>
        );
    } else if (props.post.type === "image") {
        return (
            <div className="Post">
                <ImagePost post={props.post} getUser={props.getUser}/>
                <br/>
            </div>
        );
    }
}

export default Post;
