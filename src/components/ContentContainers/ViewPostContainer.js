import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import Post from '../Post/Post.js';
import Comment from '../../components/Post/Comment.js';

function ViewPostContainer(props) {

    const [post, setPost] = useState({
        author: "404",
        caption: "Nothing here",
        game: "",
        link: "",
        text: "There are no posts to see",
        timestamp: 0,
        title: "No Content",
        type: "text"
    });
    const [postId, setPostId] = useState();
    const [comments, setComments] = useState({
        "00000000": {
            author: "404",
            commentText: "There are no posts to see",
            timestamp: 0,
            postId: ""
        }
    });

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        setPostId(url[url.length - 1]);
    }, []);

    useEffect(() => {
        props.getPost(postId, setPost);
    }, [postId])

    useEffect(() => {
        console.log(post);
        if (post.author !== "404") {
            props.getComments(postId, "postId", setComments);
        }
    }, [post])

    useEffect(() => {
        console.log(comments);
    }, [comments])

    return (
        <div className="ViewPostContainer">
            <br />
            <Post {...props} post={post} postId={postId} showCommentButton={true}/>
            <br />
            <Text text="Comments" />
            {Object.values(comments).map(comment => {
                if (comment.author !== "404")
                return (
                    <div>
                        <br />
                        <div className="commentBorder">
                            <br />
                            <Comment comment={comment} getUser={props.getUser} />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ViewPostContainer;
