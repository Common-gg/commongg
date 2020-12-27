import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import FeedType from '../FeedType.js';
import TeamfightTactics from "../../images/games/Teamfight Tactics.jpg";
import CommonChat from "../../images/games/Common Chat.png";
// import plus from "../images/icons/followingplus-1.png";

function ProfileContainer(props) {
    const [user, setUser] = useState({ profile: [], games: [], followCounts: {} });

    const [followBtnState, setFollowBtnState] = useState({
        text: "Follow"
    })
    const [followBtnStyle, setFollowBtnStyle] = useState({ visibility: "visible" });
    const [allGames, setAllGames] = useState([
        {
            title: "Common Chat",
            image: CommonChat
        },
        {
            title: "Teamfight Tactics",
            image: TeamfightTactics
        }
    ]);

    function followHandler() {
        if (followBtnState.text === "Follow") {
            props.followUser(props.currentUserId,props.pageId);
            setFollowBtnState({ ...followBtnState, text: "Following" });
        } else {
            props.unFollowUser(props.currentUserId,props.pageId);
            setFollowBtnState({ ...followBtnState, text: "Follow" });
        }
    }

    useEffect(() => {
        props.getUser(props.pageId, setUser);
    }, [props.pageId]);

    useEffect(() => {
        if (props.currentUserId) {
            if (props.currentUserId ===props.pageId) {
                setFollowBtnStyle({ visibility: "hidden" });
            }
        }
    }, [props.pageId]);

    useEffect(() => {
        if (props.currentUserInfo.following) {
            let temp = Object.values(props.currentUserInfo.following);
            if (temp.includes(props.pageId)) {
                setFollowBtnState({ ...followBtnState, text: "Following" });
            }
        }
    }, [])

    const checkId = () => {
        if(props.pageId !== undefined){
            return (
                <FeedType {...props} filter={props.pageId} sort={"author"}/>
            )
        }
    }

    const checkAboutMe = () => {
        if (user.about_me !== "") {
            return (<Text text={"About Me: " + user.about_me} />)
        }
    }

    return (
        <div className="ProfileContainer" style={{
            borderStyle: "solid",
            borderRadius: "5px",
            borderColor: "#BF9AFC",
            borderWidth: "2px",
        }}>
            <br />
            <div className="row">
                <div className="col-1"></div>
                    <ProfilePicture currentUserInfo={user} width="115px" height="115px" />
                <div className="col-5">
                    <h2><Text text={user.username} /></h2>
                   <span>{user.followCounts.following} <a style={{color: "#BF9AFC", fontSize: "25px"}}>following</a></span> <span>{user.followCounts.follower} <a style={{color: "#BF9AFC",}}>followers</a></span>
                </div>
                <div className="col-2">
                    <button onClick={() => followHandler()} type="button" className="btn btn-primary" style={followBtnStyle}>
                        {followBtnState.text}
                        {/* <img src={plus} /> */}
                    </button>
                </div>
                {checkAboutMe()}
            </div>
            <hr style={{ backgroundColor: '#5F5177', width: '90%' }} />
            <div className="flex-wrap d-flex flex-row justify-content-center">
                <div className="flex-wrap d-flex flex-row justify-content-center" style={{ width: "70%" }}>
                    {user.games.map(index => {
                        return <img
                            src={allGames[index].image}
                            key={"game-image2" + index}
                            alt={allGames[index].title}
                            className="rounded"
                            style={
                                {
                                    width: '22%',
                                    height: 'auto',
                                    margin: '3%'
                                }}
                        ></img>
                    })}
                </div>
            </div>
            {checkId()}
        </div>
    );
}

export default ProfileContainer;
