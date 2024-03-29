import React, { useEffect, useState } from 'react';
import Post from '../Post/Post.js';
import Comment from '../../components/Post/Comment.js';
import ReactionsModal from '../ReactionsModal.js';

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
    const [offSet, setOffSet] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showReactionsModal, setShowReactionsModal] = useState(false);
    const [reactionsModalContent, setReactionsModalContent] = useState(undefined);
    const [sortedComments, setSortedComments] = useState([]);
    const [commentRefresh, setCommentRefresh] = useState(0);
    const updateRefresh = function () {
        setCommentRefresh(commentRefresh + 1);
    }

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        if (url[url.length - 2] === "comment") {
            setShowComment(true);
        }
    }, []);

    useEffect(() => {
        setOffSet(window.pageYOffset);
    }, [offSet])

    useEffect(() => {
        props.getPost(props.pageId, setPost, "posts");
    }, [props.pageId, commentRefresh])

    useEffect(() => {
        if (post.author !== "404") {
            props.getComments(props.pageId, "postId", setComments);
        }
    }, [post, commentRefresh])

    useEffect(() => {
        let tempComments = Object.entries(comments).reverse();
        tempComments.sort((a, b) => (getNumReactions(b[1]) - getNumReactions(a[1])));
        setSortedComments(tempComments);
    }, [comments])

    const getNumReactions = (comment) => {
        let num = 0;
        if (comment.reacted !== undefined) {
            for (var element in comment.reacted) {
                num++;
            }
        }
        return num;
    }

    return (
        <div className="ViewPostContainer">
            <ReactionsModal getUserWithUsername={props.getUserWithUsername} setShowReactionsModal={setShowReactionsModal} showReactionsModal={showReactionsModal} content={reactionsModalContent} />
            <Post
                {...props}
                post={post}
                postId={props.pageId}
                updateRefresh={updateRefresh}
                show={showComment}
                isPostPage={true}
                isBackButtonVisible={true}
                setBackClicked={props.setBackClicked}
                style={{
                    paddingBottom: '0px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}
                setShowReactionsModal={setShowReactionsModal}
                showReactionsModal={showReactionsModal}
                setReactionsModalContent={setReactionsModalContent}
                reactions={props.reactions}
            />
            <br />
            {sortedComments.map((comment) => {
                if (comment[1].author !== "404") {
                    return (
                        <div key={comment[0]}>
                            <hr style={{ backgroundColor: '#5F5177', width: '100%' }} />
                            <Comment
                                {...props}
                                commentId={comment[0]}
                                updateRefresh={updateRefresh}
                                setShowReactionsModal={setShowReactionsModal}
                                showReactionsModal={showReactionsModal}
                                setReactionsModalContent={setReactionsModalContent}
                                reactions={props.reactions}
                            />
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default ViewPostContainer;
