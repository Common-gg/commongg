import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProfilePicture from './ProfilePicture.js';

import home from "../images/icons/logo1accent.png";
import trend from "../images/icons/trendingaccent-1.png";
import follow from "../images/icons/followingaccent-1.png";
import setting from "../images/icons/settingsaccent-1.png";
import editGame from "../images/icons/editgameaccent-1.png"

import whitehome from "../images/icons/homewhite-1.png";
import whitedit from "../images/icons/editgamewhite-1.png";
import whitesetting from "../images/icons/settingswhite-3.png"

function NavigationBar(props) {

    const [gamesArr, setGamesArr] = useState([{title: " "}]);
    const [pageState, setPageState] = useState("editgames");
    const [pageId, setPageId] = useState();

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
        if(gamesArr[0] >= 0) {
            let tempArr = []
            gamesArr.forEach(game => {
                tempArr.push(props.allGames[game]);
            });
            setGamesArr(tempArr);
        }
    }, [gamesArr]);

    const iconStyle = {
        width: "25px",
        height: "25px",
        marginRight: "1rem"
    };

    const linkStyle = {
        color: "#BF9AFC",
        textDecoration: 'none',
        fontSize: "25px"
    };

    const selectedStyle = {
        color: "white",
        textDecoration: 'none',
        fontSize: "25px"
    }

    return (
        <div className="NavigationBar" style={{ color: "#BF9AFC" }}>
            <Link to={"/profile/" + props.currentUserId} style={linkStyle}>
                <p style={pageState === "profile" ? selectedStyle : null}><img
                    src={props.currentUserInfo.profile_picture}
                    alt={""}
                    style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        marginRight: ".75rem"
                    }}
                    className="img">
                </img> profile</p>
            </Link>

            <Link to="/" style={linkStyle}>
                <p style={pageState === "" ? selectedStyle : null}><img src={home} style={iconStyle} alt="" /> home</p>
            </Link>

            {/*<Link to="/following" style={linkStyle}>
                <p><img src={follow} style={iconStyle} alt="" /> following</p>
            </Link>
            <Link to="/trending" style={linkStyle}>
                <p><img src={trend} style={iconStyle} alt="" /> trending</p>
                </Link>*/}
            {gamesArr.map((game) => {
                if (game.title === undefined) return;
                return (
                    <Link to={"/games/" + game.title.split(" ").join('').toLowerCase()} key={game.title} style={linkStyle}>
                        <p style={(pageState === "games" && game === pageId) ? selectedStyle : null}>{game.title}</p>
                    </Link>
                )
            })}
            <a id="editGamesToggle" data-toggle="modal" data-target="#chooseGamesModal" style={{ cursor: "pointer" }} >
                <p style={linkStyle}>
                    <img src={editGame} style={iconStyle}></img>edit games</p>
            </a>
            <Link to="/settings" style={linkStyle}>
                <p style={pageState === "settings" ? selectedStyle : null}><img src={setting} style={iconStyle} alt="" /> settings</p>
            </Link>
        </div>
    );
}

export default NavigationBar;
