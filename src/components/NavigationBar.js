import React from 'react';
import { Link } from "react-router-dom";
import Text from './Text.js';

function NavigationBar(props) {
    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={{ color: "#BF9AFC" }}>
                <p>Profile</p>
            </Link>
            <Link to="/" style={{ color: "#BF9AFC" }}>
                <p>Home</p>
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
