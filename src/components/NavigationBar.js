import React from 'react';
import { Link } from "react-router-dom";
import Text from './Text.js';
import ProfilePicture from './ProfilePicture.js';

import home from "../images/icons/logo1light.png";
import trend from "../images/icons/trendinglight-1.png";
import follow from "../images/icons/followinglight-1.png";
import setting from "../images/icons/settingslight-1.png";

function NavigationBar(props) {

    const iconStyle = {
        width: "50px", 
        height: "50px" 
    }

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={{ color: "#BF9AFC" }}>
                <p>Profile</p>
            </Link>
            <Link to="/" style={{ color: "#BF9AFC" }}>
                <p><img src={home} style={iconStyle} alt=""/> Home</p>
            </Link>
            <Link to="/following" style={{ color: "#BF9AFC" }}>
                <p><img src={follow} style={iconStyle} alt="" /> Following</p>
            </Link>
            <Link to="/trending" style={{ color: "#BF9AFC" }}>
                <p><img src={trend} style={iconStyle} alt=""/> Trending</p>
            </Link>
            {props.currentUserInfo.games.map(game => {
                return <Text text={game} key={game} />
            })}
            <Link to="/settings" style={{ color: "#BF9AFC" }}>
                <p><img src={setting} style={iconStyle} alt=""/> Settings</p>
            </Link>
            <Link to="/editgames" style={{ color: "#BF9AFC" }}>
                <p>Edit Games</p>
            </Link>
            <Link to="/" style={{ color: "#BF9AFC" }}>
                <p onClick={() => props.signOut()}>Logout</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
