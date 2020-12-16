import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../Text.js';
import Post from '../Post/Post';
import ProfilePicture from '../ProfilePicture.js';
import FeedContainer from './FeedContainer.js';

function ProfileContainer(props) {

    const [user, setUser] = useState({ profile: [], games: [], followCounts: {} });
    const [userId, setUserId] = useState();
    const [thisUser, setThisUser] = useState({ profile: [], games: [], followCounts: {} });

    const [followBtnState, setFollowBtnState] = useState({
        text: "Follow"
    })
    const [followBtnStyle, setFollowBtnStyle] = useState({ visibility: "visible" });

    function followHandler() {
        if (followBtnState.text === "Follow") {
            props.followUser(props.currentUser, userId);
            setFollowBtnState({ ...followBtnState, text: "Following" });
        } else {
            props.unFollowUser(props.currentUser, userId);
            setFollowBtnState({ ...followBtnState, text: "Follow" });
        }
    }

    useEffect(() => {
        console.log(props);
        let url = window.location.href;
        url = url.split('/');
        setUserId(url[url.length - 1]);
        props.getUser(props.currentUser, setThisUser);
    }, []);

    useEffect(() => {
        console.log(userId);
        props.getUser(userId, setUser);
    }, [userId]);

    useEffect(() => {
        console.log(user, props.currentUser);
    }, [user]);

    useEffect(() => {
        if (props.currentUser) {
            console.log(props.currentUser, userId);
            if (props.currentUser === userId) {
                setFollowBtnStyle({ visibility: "hidden" });
            }
        }
    }, [userId]);

    useEffect(() => {
        if (thisUser.following) {
            let temp = Object.values(thisUser.following);
            if (temp.includes(userId)) {
                setFollowBtnState({ ...followBtnState, text: "Following" });
            }
        }
    }, [thisUser])

    return (
        <div className="ProfileContainer">
            {console.log(user)}
            <div className="row">
                <div className="col-lg-4">
                    <img src={user.profile.profile_picture} alt="Avatar" width="150px" />
                </div>
                <div className="col-lg-6">
                    <Text text={user.profile.username} />
                    <Text text={"About Me: " + user.profile.bio} />
                    <Text text={"Following: " + user.followCounts.following} />
                    <Text text={"Followers: " + user.followCounts.follower} />
                </div>
                <div className="col-lg-2">
                    <button onClick={() => followHandler()} type="button" className="btn btn-primary" style={followBtnStyle}>
                        {followBtnState.text}
                    </button>
                </div>
            </div>
            <div className="row">
                <Text text="Games: (figure out how to replace the numbers with games)" />
                <div className="container testimonial-group">
                    <div className="row text-center">
                        {user.games.map(game => {
                            return <div className="col-2" key={game}>{game}</div>
                        })}
                    </div>
                </div>
            </div>
            {/*userPosts.map(post => {
                return <Post post={post} key={Math.random()} />
            })*/}
            <FeedContainer {...props}/>
        </div>
    );
}

export default ProfileContainer;
