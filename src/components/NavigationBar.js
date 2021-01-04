import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProfilePicture from './ProfilePicture.js';

import home from "../images/icons/logo1accent.png";
import trend from "../images/icons/trendingaccent-1.png";
import follow from "../images/icons/followingaccent-1.png";
import setting from "../images/icons/settingsaccent-1.png";
import editGame from "../images/icons/editgameaccent-1.png"

function NavigationBar(props) {

    const [gamesArr, setGamesArr] = useState([0]);

    useEffect(() => {
        console.log(props.currentUserInfo.games);
        if (props.currentUserInfo.games === undefined) {
            document.getElementById("editGamesToggle").click();
        } else setGamesArr(props.currentUserInfo.games);
    }, []);

    const iconStyle = {
        width: "40px",
        height: "40px",
        marginRight: ".5rem"
    };

    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: 'none',
        fontSize: "25px"
    };

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={linkStyle}>
                <p><img
                    src={props.currentUserInfo.profile_picture}
                    alt={""}
                    style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px"
                    }}
                    className="img">
                </img> profile</p>
            </Link>
            <Link to="/" style={linkStyle}>
                <p><img src={home} style={iconStyle} alt="" /> home</p>
            </Link>
            {/*<Link to="/following" style={linkStyle}>
                <p><img src={follow} style={iconStyle} alt="" /> following</p>
            </Link>
            <Link to="/trending" style={linkStyle}>
                <p><img src={trend} style={iconStyle} alt="" /> trending</p>
                </Link>*/}
            {gamesArr.map((game) => {
                return <Link to={"/games/" + (props.allGames[game].title.split(" ")).join('').toLowerCase()} key={props.allGames[game].title} style={linkStyle}>
                    <p>{props.allGames[game].title}</p>
                </Link>
            })}
            <a id="editGamesToggle" data-toggle="modal" data-target="#chooseGamesModal" style={{ cursor: "pointer" }} >
                <p style={linkStyle}>
                    <img src={editGame} style={iconStyle}></img>edit games</p>
            </a>
            <Link to="/settings" style={linkStyle}>
                <p><img src={setting} style={iconStyle} alt="" /> settings</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
