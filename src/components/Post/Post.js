import React from 'react';
import Text from '../Text.js';
import Image from '../Image.js';
import IconButton from '../IconButton.js';
import TextPost from './TextPost.js';
import VideoPost from './VideoPost.js';
import ImagePost from './ImagePost.js';

function Post(props) {
    if (props.post.type === "text") {
        return (
            <div className="Post">
                <TextPost post={props.post} />
                <br/>
            </div>
        );
    } else if (props.post.type === "image") {
        return (
            <div className="Post">
                <ImagePost post={props.post} />
                <br/>
            </div>
        );
    } else if (props.post.type === "video") {
        return (
            <div className="Post">
                <VideoPost post={props.post} />
                <br/>
            </div>
        );
    }
}

export default Post;
