import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../components/Text.js'
import Input from '../components/Input.js';
import Post from '../components/Post/Post.js';
import CreatePostModal from '../components/Post/CreatePostModal.js';
import NavigationBar from '../components/NavigationBar.js';

function Feed(props) {

    const [search, setSearch] = useState();

    let userPosts = [
        {
            type: "text",
            user: "carrot",
            time: "3h ago",
            title: "THIS GAME IS TOO FUN",
            text: "please help me\nI AM ADDICTED TO GENSHIN. It's taking over my life XD\n\nwatch me struggle ON STREAM and also help me learn how to get better.",
            likes: 125765,
            dislikes: 1109,
            numComments: 1098
        },
        {
            type: "video",
            user: "carrot",
            time: "3h ago",
            title: "epic gamer moment",
            link: "https://www.youtube.com/embed/8YBiBlsXFp8",
            text: "i am the greatest league of legends player in the whole entire world #LFT",
            likes: 3200,
            dislikes: 350,
            numComments: 1400
        },
        {
            type: "image",
            user: "carrot",
            time: "4h ago",
            title: "im beautiful",
            link: "https://i.imgflip.com/skv3y.jpg",
            text: "dms are open",
            likes: 3200,
            dislikes: 350,
            numComments: 1400
        }
    ]

    return (
        <div className="Feed">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <NavigationBar currentUserId={props.currentUserId} currentUserInfo={props.currentUserInfo} signOut={props.signOut}/>
                    </div>
                    <div className="col-lg-7">
                        <Input type="search" placeholder="search" track={setSearch} />
                        <br />
                        <CreatePostModal currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
                        <br />
                        {userPosts.map(post => {
                            return <Post post={post} key={Math.random()} />
                        })}
                    </div>
                    <div className="col-lg-3">
                        <Text text="PUT ADS HERE TO MAKE $$ YEP" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;
