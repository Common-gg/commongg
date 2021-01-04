import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import UsersModal from '../UsersModal.js';
import FeedType from '../FeedType.js';
import plus from "../../images/icons/followingplus-1.png";
import check from "../../images/icons/followingcheck-1.png";

function ProfileContainer(props) {
    const [user, setUser] = useState({ profile: [], games: [], followCounts: {} });

    const [followBtnState, setFollowBtnState] = useState({
        text: "Follow", img: plus
    })
    const [followBtnStyle, setFollowBtnStyle] = useState({
        visibility: "visible",
        backgroundColor: "transparent",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        position: "relative",
        top: "-1.6vh",
        left: "-1vw"
    });

    function followHandler() {
        if (followBtnState.text === "Follow") {
            props.followUser(props.currentUserId, props.pageId);
            setFollowBtnState({ ...followBtnState, text: "Following", img: check });
        } else {
            props.unFollowUser(props.currentUserId, props.pageId);
            setFollowBtnState({ ...followBtnState, text: "Follow", img: plus });
        }
    }

    useEffect(() => {
        props.getUser(props.pageId, setUser);
    }, [props.pageId]);

    useEffect(() => {
        if (props.currentUserId) {
            if (props.currentUserId === props.pageId) {
                setFollowBtnStyle({ visibility: "hidden" });
            } else {
                setFollowBtnStyle({
                    visibility: "visible",
                    backgroundColor: "transparent",
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    position: "relative",
                    top: "-1.6vh",
                    left: "-1vw"
                });
            }
        }
    }, [props.pageId]);

    //update the following icon when switching pages
    useEffect(() => {
        if (props.currentUserInfo.following) {
            let temp = Object.values(props.currentUserInfo.following);
            if (temp.includes(props.pageId)) {
                setFollowBtnState({ ...followBtnState, text: "Following", img: check });
            }
        }
    }, [props.pageId])

    const checkId = () => {
        if (props.pageId !== undefined) {
            return (
                <FeedType {...props} filter={props.pageId} sort={"author"} />
            )
        }
    }

    const checkAboutMe = () => {
        if (user.about_me !== "") {
            return (<Text style={{ overflowWrap: 'break-word', paddingLeft: "5px", paddingRight: "5px" }} text={user.about_me} />)
        }
    }

    const followStyle = {
        color: "#BF9AFC",
        fontSize: "1.6rem",
        marginRight: "1rem"
    };

    const numberStyle = {
        fontSize: "1.6rem"
    };

    return (
        <div>
            <div className="ProfileContainer container" style={{
                borderStyle: "solid",
                borderRadius: "5px",
                borderColor: "#BF9AFC",
                borderWidth: "2px",
            }}>
                <br />
                <div className="row p-0">
                    <div className="col-1"></div>
                    <ProfilePicture currentUserInfo={user} width="115px" height="115px" onclick="enlargeImg" style={{ boxShadow: "1px 1px 1px 1px #171421" }} />
                    <div className="col-8">
                        <h2 style={{ marginTop: "5%" }}>
                            {user.username}
                        </h2>
                        <div className="d-flex flex-wrap">
                            
                            <UsersModal {...props} user={user} type="followers"></UsersModal>
                            <UsersModal {...props} user={user} type="following"></UsersModal>
                            
                            <span>
                                <button onClick={() => followHandler()} type="button" className="btn btn-primary" style={followBtnStyle}>
                                    <img src={followBtnState.img} style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                    }} />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container text-wrap row" style={{ margin: "auto" }}>
                        <div className="col-12">
                            <br />{checkAboutMe()}
                        </div></div>
                <hr style={{ backgroundColor: '#5F5177', width: '90%' }} />
                <div className="flex-wrap d-flex flex-row justify-content-center">
                    <div className="row justify-content-center" style={{ width: "70%" , paddingBottom: '20px'}}>
                        {user.games.map(index => {
                            if (props.currentUserInfo.games.includes(index)) {
                                return (
                                    <div key={index} className="col-4">
                                        <Link to={"/games/" + (props.allGames[index].title.split(" ")).join('').toLowerCase()}>
                                            <img
                                                src={props.allGames[index].image}
                                                key={"game-image2" + index}
                                                alt={props.allGames[index].title}
                                                className="rounded"
                                                style={{
                                                  width: '8rem',
                                                  height: 'auto',
                                                  margin: '3%',
                                                  padding: '.3rem',
                                                  marginBottom: "10%",
                                                  marginTop: "4%"
                                                }}
                                            />
                                        </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="col-4">
                                        <img
                                            src={props.allGames[index].image}
                                            key={"game-image2" + index}
                                            alt={props.allGames[index].title}
                                            className="rounded"
                                            style={{
                                                width: '8rem',
                                                height: 'auto',
                                                margin: '3%',
                                                padding: '.3rem',
                                                marginBottom: "10%",
                                                marginTop: "4%"
                                              }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <br />
            { checkId()}
        </div>
    );
}

export default ProfileContainer;
