import React from 'react';
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar';
import ViewPostContainer from '../components/Page Containers/ViewPostContainer';

function ViewPost(props) {

    let nestedComment3 = {
        user: "carrot",
        time: "3h ago",
        text: "example text for nestedComment3",
        likes: 0,
        dislikes: 0,
        numComments: 0,
        comments: []
    }
    let nestedComment1 = {
        user: "carrot",
        time: "3h ago",
        text: "example text for nestedComment1",
        likes: 0,
        dislikes: 0,
        numComments: 1,
        comments: [nestedComment3]
    }
    let nestedComment2 = {
        user: "carrot",
        time: "3h ago",
        text: "example text for nestedComment2",
        likes: 0,
        dislikes: 0,
        numComments: 0,
        comments: []
    }
    let comment1 = {
        user: "carrot", //input a user here rather than just a string
        time: "3h ago", //input a time here and then convert
        text: "example text for comment1",
        likes: 10,
        dislikes: 2,
        numComments: 2,
        comments: [nestedComment1, nestedComment2]
    }
    let comment2 = {
        user: "darkorin",
        time: "4h ago",
        text: "example text for comment2",
        likes: 10,
        dislikes: 2,
        numComments: 0,
        comments: []
    }
    let userPost =
    {
        type: "text",
        user: "carrot",
        time: "3h ago",
        title: "THIS GAME IS TOO FUN",
        text: "please help me\nI AM ADDICTED TO GENSHIN. It's taking over my life XD\n\nwatch me struggle ON STREAM and also help me learn how to get better.",
        likes: 125765,
        dislikes: 1109,
        numComments: 2,
        comments: [comment1, comment2]
    }

    return (
        <div className="ViewPost">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut}/>
                    </div>
                    <div className="col-lg-7">
                        <ViewPostContainer post={userPost}/>
                    </div>
                    <div className="col-lg-3">
                        <Text text="col 3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPost;
