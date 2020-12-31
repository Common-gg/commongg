import React, { useEffect, useState } from 'react';
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
    const [comments, setComments] = useState({
        "00000000": {
            author: "404",
            commentText: "There are no posts to see",
            timestamp: 0,
            postId: ""
        }
    });
    const [commentRefresh, setCommentRefresh] = useState(0)
    const updateRefresh = function () {
        setCommentRefresh(commentRefresh + 1);
    }

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        if (url[url.length - 2] === "comment") {
            document.getElementById("createCommentButton").click();
        }
    }, []);

    useEffect(() => {
        props.getPost(props.pageId, setPost);
    }, [props.pageId, commentRefresh])

    useEffect(() => {
        if (post.author !== "404") {
            props.getComments(props.pageId, "postId", setComments);
        }
    }, [post, commentRefresh])

    return (
        <div className="ViewPostContainer">
            <Post {...props} post={post} postId={props.pageId}
                updateRefresh={updateRefresh}
                style={{
                    paddingBottom: '0px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}
            />
            <br />
            {Object.values(comments).reverse().map((comment, i) => {
                if (comment.author !== "404")
                    return (
                        <div key={Object.keys(comments).reverse()[i]}>
                            <hr style={{ backgroundColor: '#5F5177', width: '100%' }} />
                            <Comment {...props} commentId={Object.keys(comments).reverse()[i]} showCommentButton={true} updateRefresh={updateRefresh} />
                        </div>
                    )
            })}
        </div>
    );
}

export default ViewPostContainer;
