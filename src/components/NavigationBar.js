import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import home from "../images/icons/logo1accent.png";
import follow from "../images/icons/followingaccent-1.png";
import setting from "../images/icons/settingsaccent-1.png";
import editGame from "../images/icons/editgameaccent-1.png"
import whitehome from "../images/icons/homewhite-1.png";
import whitefollow from "../images/icons/followingwhite-3.png";
import whitesetting from "../images/icons/settingswhite-3.png";



function NavigationBar(props) {

    const [gamesArr, setGamesArr] = useState([{ title: " " }]);
    const [pageState, setPageState] = useState("editgames");
    const [pageId, setPageId] = useState();
    const [modLevel, setModLevel] = useState(0);

    useEffect(() => {
        if (props.currentUserInfo === undefined) return;
        if (props.currentUserInfo.moderationLevel) {
            setModLevel(props.currentUserInfo.moderationLevel);
        }
    }, []);

    useEffect(() => {
        if (props.currentUserInfo !== undefined && (props.currentUserInfo.games === undefined || props.currentUserInfo.games === [])) {
            setPageState("editgames");
            return;
        }
        let url = window.location.href;
        url = url.split('/');
        setPageState(url[3]);
        if (url.length >= 5) {
            //if page state is games check the id
            if (url[3] === "games") {
                //find current title's id which is its index in the array
                const curGameId = props.allGames.findIndex((game) => {
                    return game.title.split(" ").join('').toLowerCase() === url[url.length - 1];
                });
                //game id is the index
                setPageId(curGameId);
            } else {
                setPageId(url[url.length - 1]);
            }
        }
    });

    useEffect(() => {
        if (props.currentUserInfo === undefined) {
            setGamesArr([0, 1]);
            return;
        }
        else if (props.currentUserInfo.games === undefined) {
            document.getElementById("editGamesToggle").click();
        } else setGamesArr(props.currentUserInfo.games);
    }, [props.currentUserInfo]);

    useEffect(() => {
        if (gamesArr[0] >= 0) {
            let tempArr = []
            gamesArr.forEach(game => {
                tempArr.push(props.allGames[game]);
            });
            setGamesArr(tempArr);
        }
    }, [gamesArr]);

    const buttonStyle = {
        height: 40,
        width: 120,
        marginLeft: "auto",
        backgroundColor: "#BF9AFC",
        color: "#2A2A2D",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        cursor: "pointer",
        fontSize: "20px"
    }

    const selectedStyle = {
        color: "white",
        textDecoration: 'none',

    }

    const signUpClick = () => {
        props.setSignUpShow(true);
        props.setModalState("SignUp");
    }

    const loginClick = () => {
        props.setSignUpShow(true);
        props.setModalState("Login");
    }

    return (
        <div className="NavigationBar"
            style={{ color: "#BF9AFC" }}>
            <Link to="/" className="navLinkStyle">
                <p style={pageState === "" ? selectedStyle : null}>
                    <img className="navIconStyle" src={pageState === "" ? whitehome : home} alt="" /> Home</p>
            </Link>

            {props.currentUserInfo ?
                <Link to={"/profile/" + props.currentUserInfo.username} className="navLinkStyle">
                    <p style={pageState === "profile" ? selectedStyle : null}>
                        <img src={
                            props.currentUserInfo.profile_picture ? (
                                props.currentUserInfo.profile_picture.includes('firebasestorage') ?
                                    `https://${process.env.REACT_APP_imgixURL}/users/${props.currentUserId}?fit=fill&h=35&w=35&auto=format,enhance&q=75` : props.currentUserInfo.profile_picture) : null}
                            alt={""}
                            className="img navProfileIconStyle">
                        </img> Profile</p>
                </Link> : null}
            {props.currentUserInfo ?
                <Link to="/following" className="navLinkStyle">
                    <p style={pageState === "following" ? selectedStyle : null}>
                        <img className="navIconStyle" src={pageState === "following" ? whitefollow : follow} alt="" /> Following</p>
                </Link> : null}
            {gamesArr.map((game) => {
                if (game.title === undefined) return;
                return (
                    <Link to={"/games/" + game.title.split(" ").join('').toLowerCase()} key={game.title} className="navLinkStyle">
                        <p style={(pageState === "games" && game.title === props.allGames[pageId].title) ? selectedStyle : null}>
                            <img src={(pageState === "games" && game.title === props.allGames[pageId].title) ? game.whiteIcon : game.icon} className="navIconStyle" alt="" /> {game.title}</p>
                    </Link>
                )
            })}
            {props.currentUserInfo ?
                <a id="editGamesToggle" data-toggle="modal" data-target="#chooseGamesModal" style={{ cursor: "pointer" }} >
                    <p className="navLinkStyle">
                        <img src={editGame} className="navIconStyle"></img> Edit Games</p>
                </a> : null}
            {props.currentUserInfo ?
                <Link to="/settings" className="navLinkStyle">
                    <p style={pageState === "settings" ? selectedStyle : null}>
                        <img src={pageState === "settings" ? whitesetting : setting} className="navIconStyle" alt="" /> Settings</p>
                </Link> : null}
            {props.currentUserInfo && modLevel > 0 ?
                <Link to="/moderateposts" className="navLinkStyle">
                    <p style={pageState === "moderateposts" ? selectedStyle : null}>
                        <img src={setting} className="navIconStyle" alt="" /> Moderate Posts</p>
                </Link>
                : null}
            {props.currentUserInfo && modLevel > 0 ?
                <Link to="/moderateusers" className="navLinkStyle">
                    <p style={pageState === "moderateusers" ? selectedStyle : null}>
                        <img src={setting} className="navIconStyle" alt="" /> Moderate Users</p>
                </Link>
                : null}
            {!props.currentUserInfo ?
                <div className="text-center">
                    <br />
                    <button style={buttonStyle} onClick={signUpClick}>
                        Sign Up
                    </button>
                    <br />
                    <br />
                    <button style={buttonStyle} onClick={loginClick}>
                        Login
                    </button>
                </div>
                : null}
        </div>
    );
}

export default NavigationBar;
