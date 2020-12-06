import React from 'react';
import { Link } from "react-router-dom";
import Text from './Text.js';

function NavigationBar(props) {
    return (
        <div className="NavigationBar">
            <Link to={"/profile/" + props.currentUserId}>
                <p>Profile</p>
            </Link>
            <Link to="/">
                <p>Home</p>
            </Link>
            {props.currentUserInfo.games.map(game => {
                return <Text text={game} key={game} />
            })}
            <Link to="/EditProfile">
                <p>Settings</p>
            </Link>
            <Link to="/">
                <p onClick={() => props.signOut()}>Logout</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
