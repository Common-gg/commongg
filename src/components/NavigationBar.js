import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Text from './Text.js';
import ProfilePicture from './ProfilePicture.js';

import home from "../images/icons/logo1accent.png";
import trend from "../images/icons/trendingaccent-1.png";
import follow from "../images/icons/followingaccent-1.png";
import setting from "../images/icons/settingsaccent-1.png";

function NavigationBar(props) {
    const iconStyle = {
        width: "50px",
        height: "50px"
    };

    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: 'none'
    };

    useEffect(() => {
        if (props.currentUserInfo.games === undefined) {
            document.getElementById("editGamesToggle").click();
        }
    }, []);

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={linkStyle}>
            <ProfilePicture currentUserInfo={props.currentUserInfo} width="190px" height="190px" /> <p>Profile</p>
            </Link>
            <Link to="/" style={linkStyle}>
                <p><img src={home} style={iconStyle} alt="" /> Home</p>
            </Link>
            <Link to="/following" style={linkStyle}>
                <p><img src={follow} style={iconStyle} alt="" /> Following</p>
            </Link>
            <Link to="/trending" style={linkStyle}>
                <p><img src={trend} style={iconStyle} alt="" /> Trending</p>
            </Link>
            <Link to="/settings" style={linkStyle}>
                <p><img src={setting} style={iconStyle} alt="" /> Settings</p>
            </Link>
            <a id="editGamesToggle" data-toggle="modal" data-target="#chooseGamesModal" style={linkStyle} style={{cursor: "pointer"}}>
                <p>Edit Games</p>
            </a>
            <Link to="/" style={linkStyle}>
                <p onClick={() => props.signOut()}>Logout</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
