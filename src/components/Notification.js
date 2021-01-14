import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Text from "./Text.js";

function Notification(props) {
    const [notificationText, setNotificationText] = useState("");
    const [user, setUser] = useState({ username: "" });
    const [linkType, setLinkType] = useState("post");

    useEffect(() => {
        
        props.getUser(props.notification.userID, setUser);
    }, [])

    useEffect(() => {
        if (user === undefined) return;

        getPostTitle();

    }, [user])

    function getPostTitle() {

        if (props.notification.locationID === props.notification.userID) {
            setText(user);
        }
        else {
            let postType = "posts";

            if (props.notification.type === "comments_reaction") {
                postType = "comments";
            }
            props.getPost(props.notification.locationID, setText, postType, ()=>props.deleteNotificationHandler(props.id));
        }
    }

    function setText(post) {
        console.log(post);
        let postTitle = "";

        if (props.notification.type === "comments_reaction") {
            postTitle = post.commentText;
        }
        else if (props.notification.type !== "followed") {
            postTitle = post.title;
        }

        if (props.notification.type === "comment") {
            setNotificationText(` commented on your post \"${postTitle}\"`)
        } else if (props.notification.type === "followed") {

            setLinkType("profile");
            setNotificationText(` followed you!`)
        } else if (props.notification.type === "posts_reaction") {
            setNotificationText(` reacted to your post \"${postTitle}\"`)
        } else if (props.notification.type === "comments_reaction") {
            setNotificationText(` reacted to your comment \"${postTitle}\"`)
        }
    }

    return (
        <Link to={`/${linkType}/${props.notification.locationID}`} className="Notification" >
            <Text text={new Date(props.notification.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.notification.timestamp).toLocaleDateString("en-US")}
                style={{ color: '#BF9AFC', fontSize: '.7rem', paddingLeft: "1.8rem", paddingRight: ".2rem" }}
            />
            <div style={{ fontSize: '.9rem', paddingLeft: "1.8rem", paddingRight: ".2rem" }}>
                <Link to={`/profile/${props.notification.userID}`}>{user.username}</Link>
                <span style={{ color: '#BF9AFC' }}>
                    {notificationText}
                </span>
            </div>
        </Link>
    );
}

export default Notification;
