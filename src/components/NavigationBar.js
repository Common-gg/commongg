import React from 'react';
import { Link } from "react-router-dom";
import Text from './Text.js';
import home from "../images/icons/logo1light.png";

function NavigationBar(props) {

    const iconStyle = {
        width: "10px", 
        height: "10px" 
    }

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={{ color: "#BF9AFC" }}>
                <p>Profile</p>
            </Link>
            <Link to="/" style={{ color: "#BF9AFC" }}>
                <p><img src={home} style={iconStyle} />Home</p>
            </Link>
            {props.currentUserInfo.games.map(game => {
                return <Text text={game} key={game} />
            })}
            <Link to="/EditProfile" style={{ color: "#BF9AFC" }}>
                <p>Settings</p>
            </Link>
            <Link to="/" style={{ color: "#BF9AFC" }}>
                <p onClick={() => props.signOut()}>Logout</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
