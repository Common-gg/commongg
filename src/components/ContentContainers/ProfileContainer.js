import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import FeedType from '../FeedType.js';

function ProfileContainer(props) {

    const [user, setUser] = useState({ profile: [], games: [], followCounts: {} });
    const [userId, setUserId] = useState();

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
        let url = window.location.href;
        url = url.split('/');
        setUserId(url[url.length - 1]);
    }, []);

    useEffect(() => {
        props.getUser(userId, setUser);
    }, [userId]);

    useEffect(() => {
        if (props.currentUserId) {
            if (props.currentUserId === userId) {
                setFollowBtnStyle({ visibility: "hidden" });
            }
        }
    }, [userId]);

    useEffect(() => {
        if (props.currentUserInfo.following) {
            let temp = Object.values(props.currentUserInfo.following);
            if (temp.includes(userId)) {
                setFollowBtnState({ ...followBtnState, text: "Following" });
            }
        }
    }, [])

    const checkId = () => {
        if(userId !== undefined){
            return (
                <FeedType {...props} filter={userId} sort={"author"}/>
            )
        }
    }

    const checkAboutMe = () => {
        if(user.profile.about_me !== ""){
            return (<Text text={"About Me: " + user.profile.about_me} />)
        }
    }

    return (
        <div className="ProfileContainer">
            <div className="row">
                <div className="col-lg-4">
                    <ProfilePicture currentUserInfo={user} width="150px" height="150px"/>
                </div>
                <div className="col-lg-6">
                    <Text text={user.profile.username} />
                    {checkAboutMe()}
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
            {checkId()}
        </div>
    );
}

export default ProfileContainer;
