import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProfilePicture from './ProfilePicture.js';

import home from "../images/icons/logo1accent.png";
import trend from "../images/icons/trendingaccent-1.png";
import follow from "../images/icons/followingaccent-1.png";
import setting from "../images/icons/settingsaccent-1.png";
import editGame from "../images/icons/editgameaccent-1.png"
import whitehome from "../images/icons/homewhite-1.png";
import whitetrend from "../images/icons/trendingwhite-3.png";
import whitedit from "../images/icons/editgamewhite-1.png";
import whitefollow from "../images/icons/followingwhite-3.png";
import whitesetting from "../images/icons/settingswhite-3.png";
import chat from "../images/icons/chat-1.png";
import whitechat from "../images/icons/chatwhite-1.png";
import tft from "../images/icons/tft-1.png";
import whitetft from "../images/icons/tftwhite-1.png";



function NavigationBar(props) {

    const [gamesArr, setGamesArr] = useState([{ title: " " }]);
    const [pageState, setPageState] = useState("editgames");
    const [pageId, setPageId] = useState();
    const [modLevel, setModLevel] = useState(0);

    useEffect(() => {
        if (props.currentUserInfo.moderationLevel) {
            setModLevel(props.currentUserInfo.moderationLevel);
        }
    }, []);

    useEffect(() => {
        if (props.currentUserInfo.games === undefined || props.currentUserInfo.games === []) {
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
        if (props.currentUserInfo.games === undefined) {
            document.getElementById("editGamesToggle").click();
        } else setGamesArr(props.currentUserInfo.games);
    }, [props.currentUserInfo.games]);

    useEffect(() => {
        if (gamesArr[0] >= 0) {
            let tempArr = []
            gamesArr.forEach(game => {
                tempArr.push(props.allGames[game]);
            });
            setGamesArr(tempArr);
        }
    }, [gamesArr]);

    const profileStyle = {
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        marginRight: "0.5rem",
    }

    const iconStyle = {
        width: "35px",
        height: "35px",
        marginRight: "0.5rem",
    };

    const gameIconStyle = {
        width: "35px",
        height: "35px",
        marginRight: "0.5rem",
        borderRadius: "100%",
    };

    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: 'none',
        fontSize: "25px",
    };

    const selectedStyle = {
        color: "white",
        textDecoration: 'none',
        fontSize: "25px",
    }

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to="/" style={linkStyle}>
                <p style={pageState === "" ? selectedStyle : null}><img src={pageState === "" ? whitehome : home} style={iconStyle} alt="" /> Home</p>
            </Link>

            <Link to={"/profile/" + props.currentUserInfo.username} style={linkStyle}>
                <p style={pageState === "profile" ? selectedStyle : null}><img
                    src={props.currentUserInfo.profile_picture}
                    alt={""}
                    style={profileStyle}
                    className="img">
                </img> Profile</p>
            </Link>

            {<Link to="/following" style={linkStyle}>
                <p style={pageState === "following" ? selectedStyle : null}><img src={pageState === "following" ? whitefollow : follow} style={iconStyle} alt="" /> Following</p>
            </Link>
            /*<Link to="/trending" style={linkStyle}>
                <p style={pageState === "trending" ? selectedStyle : null}><img src={pageState === "trending" ? whitetrend:trend} style={iconStyle} alt="" /> Trending</p>
                </Link>*/}
            {gamesArr.map((game) => {
                if (game.title === undefined) return;
                return (
                    <Link to={"/games/" + game.title.split(" ").join('').toLowerCase()} key={game.title} style={linkStyle}>
                        <p style={(pageState === "games" && game.title === props.allGames[pageId].title) ? selectedStyle : null}>
                            <img src={(pageState === "games" && game.title === props.allGames[pageId].title) ? game.whiteIcon : game.icon} style={gameIconStyle} alt="" /> {game.title}</p>
                    </Link>
                )
            })}
            <a id="editGamesToggle" data-toggle="modal" data-target="#chooseGamesModal" style={{ cursor: "pointer" }} >
                <p style={linkStyle}>
                    <img src={editGame} style={iconStyle}></img> Edit Games</p>
            </a>
            <Link to="/settings" style={linkStyle}>
                <p style={pageState === "settings" ? selectedStyle : null}><img src={pageState === "settings" ? whitesetting : setting} style={iconStyle} alt="" /> Settings</p>
            </Link>
            {modLevel > 0 ?
                <Link to="/moderateposts" style={linkStyle}>
                    <p style={pageState === "moderateposts" ? selectedStyle : null}><img src={setting} style={iconStyle} alt="" /> Moderate Posts</p>
                </Link>
                : null}
            {modLevel > 0 ?
                <Link to="/moderateusers" style={linkStyle}>
                    <p style={pageState === "moderateusers" ? selectedStyle : null}><img src={setting} style={iconStyle} alt="" /> Moderate Users</p>
                </Link>
                : null}
        </div>
    );
}

export default NavigationBar;
