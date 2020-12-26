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
    const [commentRefresh, setCommentRefresh] = useState(0)
    const updateRefresh = function() {
        setCommentRefresh(commentRefresh + 1);
    }

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        setPostId(url[url.length - 1]);
    }, []);

    useEffect(() => {
        props.getPost(postId, setPost);
    }, [postId, commentRefresh])

    useEffect(() => {
        console.log(post);
        if (post.author !== "404") {
            props.getComments(postId, "postId", setComments);
        }
    }, [post, commentRefresh])

    useEffect(() => {
        console.log(comments);
    }, [comments])

    return (
        <div className="ViewPostContainer">
            <Post {...props} post={post} postId={postId} showCommentButton={true}
                updateRefresh={updateRefresh} showCategory={true}
                style={{
                    paddingBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px'
                }}
            />
            <br />
            {Object.values(comments).map(comment => {
                if (comment.author !== "404")
                    return (
                        <div>
                            <hr style={{ backgroundColor: '#5F5177', width: '100%' }} />
                            <Comment comment={comment} getUser={props.getUser} />
                        </div>
                    )
            })}
        </div>
    );
}

export default ViewPostContainer;
