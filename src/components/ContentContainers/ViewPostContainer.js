import React, { useEffect, useState } from 'react';
import Text from '../Text.js';
import Post from '../Post/Post.js';
import Comment from '../../components/Post/Comment';

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

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        setPostId(url[url.length - 1]);
    }, []);

    useEffect(()=>{
        props.getPost(postId, setPost);
    }, [postId])

    useEffect(() => {
        console.log(post);
    }, [post])

    return (
        <div className="ViewPostContainer">
            <br/>
            <Post post={post} getUser={props.getUser}/>
            <br />
            <Text text="Comments" />
            {/*props.post.comments.map(comment => {
                return (
                    <div className="commentBorder">
                        <Comment comment={comment} />
                    </div>
                );
            })*/}
        </div>
    );
}

export default ViewPostContainer;
