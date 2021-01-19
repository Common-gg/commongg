import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Text from '../Text.js';
import ProfilePicture from '../ProfilePicture.js';
import UsersModal from '../UsersModal.js';
import FeedType from '../FeedType.js';
import plus from "../../images/icons/followingplus-1.png";
import check from "../../images/icons/followingcheck-1.png";
import optionsIcon from '../../images/icons/options.png';

function ProfileContainer(props) {
    const [user, setUser] = useState({ profile: [], games: [], followCounts: {} });
    const [verified, setVerified] = useState(false);
    //this represent old page id which is the unique id
    const [pageId, setPageId] = useState(null)
  
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
            props.followUser(props.currentUserId, pageId);
            setFollowBtnState({ ...followBtnState, text: "Following", img: check });
        } else {
            props.unFollowUser(props.currentUserId, pageId);
            setFollowBtnState({ ...followBtnState, text: "Follow", img: plus });
        }
    }

    //retrieve the user and pageId from the username
    useEffect(() => {
      //if the username exists
      if (props.username) {
        props.getUserWithLower(props.username, setUser, setPageId)
      }
    }, [props.username, props.getUserWithLower])

    //check if the current user is self
    useEffect(() => {
        if (props.currentUserId && pageId) {
            if (props.currentUserId === pageId) {
                setFollowBtnStyle({ visibility: "hidden" });
            } else {
                setFollowBtnState({ text: "Follow", img: plus })
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
    }, [pageId]);

    //update the following icon when switching pages
    useEffect(() => {
        //check if user is using follow properly
        if(user.verified) setVerified(true);
        if (props.currentUserId === pageId) {
            //already set to invisible since it's self
            return;
        }
        if (user.followers) {
            let temp = Object.values(user.followers);
            //check if current user
            if (temp.includes(props.currentUserId)) {
                setFollowBtnState({ ...followBtnState, text: "Following", img: check });
            } else {
                setFollowBtnState({ ...followBtnState, text: "Follow", img: plus });
            }
        }
    }, [user])

    const checkId = () => {
        if (pageId != null) {
            return (
                <FeedType {...props} filter={pageId} sort={"author"} />
            )
        }
    }

    const checkAboutMe = () => {
        if (user.about_me !== "") {
            return (<Text style={{ overflowWrap: 'break-word', paddingLeft: "5px", paddingRight: "5px", whiteSpace: "pre-wrap" }} text={user.about_me} />)
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

    function checkOptions() {
        let modLvl;
        if (!props.currentUserInfo.moderationLevel) {
            modLvl = 0;
        } else {
            modLvl = props.currentUserInfo.moderationLevel;
        }
        return (
            <div>
                 {props.currentUserId !== user.id || modLvl > 0 ?  <div id="dropdownMenuButton" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "transparent" }}>
                    <img src={optionsIcon} alt={"options"} style={{ backgroundColor: "transparent" }} />
                </div> : null}
                <div className="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ color: "#BF9AFC", backgroundColor: "#BF9AFC" }}>
                    {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.verifyUser(pageId, !verified)} style={{ cursor: "pointer" }}>Verify User/Revoke Verification</p> : null}
                    {props.currentUserId !== user.id ? <p className="dropdown-item mb-0" onClick={() => props.report("users", pageId)} style={{ cursor: "pointer" }}>Report User</p> : null}
                    {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.clearReports("users", props.pageId)} style={{ cursor: "pointer" }}>Clear Reports (Current: {user.reports ? user.reports : 0})</p> : null}
                    {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(pageId, 0)} style={{ cursor: "pointer" }}>Set Moderation Level: User</p> : null}
                    {modLvl > 1 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(pageId, 1)} style={{ cursor: "pointer" }}>Set Moderation Level: Mod</p> : null}
                    {modLvl > 2 ? <p className="dropdown-item mb-0" onClick={() => props.setModerationLevel(pageId, 2)} style={{ cursor: "pointer" }}>Set Moderation Level: Admin</p> : null}
                    {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.resetPfp(pageId)} style={{ cursor: "pointer" }}>Reset Profile Picture</p> : null}
                </div>
            </div>
        )
    }

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
                    <ProfilePicture currentUserInfo={user} width="115px" height="115px" onclick="enlargeImg" style={{ boxShadow: "1px 1px 1px 1px #171421" }}
                        setProfilePictureImage={props.setProfilePictureImage} />
                    <div className="col-8">
                        <h2 className="row" style={{ marginTop: "5%", marginLeft: "0.5%" }}>
                            {user.username + " "}
                            {verified ?
                            <img src={check} alt={user.username + "verified"}
                                style={{
                                    width: "1.8rem",
                                    height: "1.8rem",
                                }} />
                            : null}
                         <div className="ml-auto pr-3 dropdown" style={{marginTop: "-1rem", marginRight: "-1rem" }}>
                            {checkOptions()}
                        </div>
                        </h2>
                        <div className="d-flex flex-wrap" style={{marginBottom: "-8%"}}>

                            <UsersModal {...props} user={user} type="followers"></UsersModal>
                            <UsersModal {...props} user={user} type="following"></UsersModal>

                            <span>
                                <button onClick={() => followHandler()} type="button" className="btn btn-primary" style={followBtnStyle}>
                                    <img src={followBtnState.img} style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        position: "relative"
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
                <div className="row mx-auto justify-content-center">
                    <div className="row mx-auto justify-content-center" style={{ width: "70%", paddingBottom: '20px' }}>
                        {user.games.map(index => {
                            if (props.currentUserInfo.games.includes(index)) {
                                return (
                                    <div key={index} className="col-4">
                                        <Link to={"/games/" + (props.allGames[index].title.split(" ")).join('').toLowerCase()}>
                                            <img
                                                src={props.allGames[index].icon}
                                                key={"game-image2" + index}
                                                alt={props.allGames[index].title}
                                                className="rounded"
                                                style={{
                                                    width: '55%',
                                                    height: 'auto',
                                                    marginBottom: "10%",
                                                }}
                                            />
                                            <p>{props.allGames[index].title}</p>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="col-4">
                                        <img
                                            src={props.allGames[index].icon}
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
                                        <p>{props.allGames[index].title}</p>
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
