import React from 'react';
import TextPost from './TextPost.js';
import ImagePost from './ImagePost.js';

function Post(props) {
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
<<<<<<< HEAD
                <ImagePost post={props.post} getUser={props.getUser}/>
=======
                <ImagePost post={props.post} />
>>>>>>> 585d9699119f9312dff3490467b80b06a5d2edf8
                <br/>
            </div>
        );
    }
}

export default Post;
