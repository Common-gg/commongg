import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import Post from '../Post/Post.js';
import Comment from '../Post/Comment';

function ViewPostContainer(props) {
    return (
        <div className="ViewPostContainer">
            <Post post={props.post} />
            <br />
            <Text text="Comments" />
            {props.post.comments.map(comment => {
                return (
                    <div className="commentBorder">
                        <Comment comment={comment} />
                    </div>
                );
            })}
        </div>
    );
}

export default ViewPostContainer;
