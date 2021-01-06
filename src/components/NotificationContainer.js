import React, { useState, useEffect } from "react";
import { Popover, OverlayTrigger } from 'react-bootstrap';
import Text from "./Text.js";
import Notification from "./Notification.js"
import NotificationUnread from "../images/icons/notificationfull-1.png";
import NotificationRead from "../images/icons/notificationempty-1.png";

function NotificationContainer(props) {

    const [imageSource, setImageSource] = useState(NotificationRead);
    const [unreadNotificationCounter, setUnreadNotificationCounter] = useState(0);
    const [allNotifications, setAllNotifications] = useState({});
    const [readNotifications, setReadNotifications] = useState({});
    const [unreadNotifications, setUnreadNotifications] = useState({});


    useEffect(() => {
        props.notificationListener(notificationHandler);
    }, []);

    useEffect(() => {
        console.log(readNotifications);
        setAllNotifications({
            ...readNotifications,
            ...unreadNotifications
        })
    }, [readNotifications, unreadNotifications]);


    function notificationHandler(notifications, type) {
        if (type === "read") {
            setReadNotifications(notifications);
        }
        else {
            console.log(allNotifications);
            console.log(notifications);
            setUnreadNotifications({ ...allNotifications, ...notifications });
            setUnreadNotificationCounter(unreadNotificationCounter + 1);
            setImageSource(NotificationUnread);
        }
    }


    function handleNotificationClick() {
        props.readNotifications();
        setImageSource(NotificationRead);
        setReadNotifications(allNotifications);
        setUnreadNotifications({});
        setUnreadNotificationCounter(0);
    }

    function deleteNotificationHandler(notificationID) {
        props.deleteNotification(notificationID);

        let tempObj = readNotifications;
        delete tempObj[notificationID];

        console.log(tempObj);
        setReadNotifications(tempObj);
    }

    const notificationPopoverStyle = {
        backgroundColor: "#292833",
        borderRadius: "20px",
    }


    const notificationPopover = (
        <Popover id="notificationPopover" style={notificationPopoverStyle}>
            <Popover.Content>
                <div className="row">
                    {allNotifications ?
                        Object.values(allNotifications).reverse().map((notification, i) => {
                            return (
                                <div style={{ width: "100%" }} key={Object.keys(allNotifications).reverse()[i]} >
                                    {i !== 0 ? <hr style={{ backgroundColor: '#BF9AFC', width: "97%", padding: "0" }} /> : null}
                                    <div className="row">
                                        <div className="col-10">
                                            <Notification getUser={props.getUser} getPost={props.getPost} notification={notification} />
                                        </div>
                                        <span onClick={() => deleteNotificationHandler(Object.keys(allNotifications).reverse()[i])} style={{ color: '#BF9AFC', fontSize: "1.5rem", cursor: "pointer" }}>&times;</span>
                                    </div>
                                </div>
                            )
                        }) : null}
                </div>
            </Popover.Content>
        </Popover>
    );

    return (
        <div style={{ marginLeft: "40%" }}>
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={notificationPopover}>
                <img src={imageSource} onClick={handleNotificationClick} alt="Notification Icon" style={{ width: "3rem", height: "3rem", cursor: "pointer" }} />
            </OverlayTrigger>
            {unreadNotificationCounter !== 0 ? <Text text={unreadNotificationCounter}
                style={{
                    backgroundColor: "#8F00FF",
                    borderRadius: "50%",
                    width: "2rem",
                    height: "2rem",
                    fontSize: "1.4rem",
                    paddingLeft: ".5rem",
                    paddingTop: ".1rem",
                    position: "relative",
                    top: "-1.4rem",
                    left: "1.9rem"
                }} /> : null}

        </div>
    );
}
export default NotificationContainer;