import React, { useState, useEffect } from "react";
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar.js';

function Followers(props) {

    const [user, setUser] = useState({ profile: [], games: [] });
    const [userId, setUserId] = useState();

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        setUserId(url[url.length - 1]);
        props.getUser(props.currentUser, setUser);
    }, []);

    useEffect(() => {
        props.getUser(userId, setUser);
    }, [userId]);

    let carrot = {
        username: "Carrot",
        link: "https://firebasestorage.googleapis.com/v0/b/commongg-6cb2a.appspot.com/o/users%2Fymu9NCYepmX0XHbdkMRHuIWnKjg2?alt=media&token=b123394f-6d8b-43a0-8529-6e0d85f2df73"
    }

    let followers = [ //array of users
        carrot,
        carrot,
        carrot,
        carrot,
        carrot,
        carrot,
        carrot,
        carrot,
        carrot,
        carrot
    ]

    return (
        <div className="Followers">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="col-lg-2">
                            <NavigationBar currentUserId={props.currentUser} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
                        </div>
                    </div>
                    <div className="col-7 text-center">
                        <br />
                        <Text text="Mutual Followers (remove this if you are the user)" />
                        <div className="row">
                            {followers.map(follower => { // replacewith user.following.map later
                                return <div className="col-3">
                                    <img src={user.profile_picture} alt="Avatar" width="100%" />
                                    <br />
                                    {follower.username}
                                    <button type="button" className="btn btn-primary">
                                        Followers
                                    </button>
                                </div>
                            })}
                        </div>
                        <br />
                        <br />
                        <Text text="Followers" />
                        <div className="row">
                            {followers.map(follower => { // replacewith user.followers.map later
                                return (
                                    <div className="col-3">
                                        <img src={user.profile_picture} alt="Avatar" width="100%" />
                                        <br />
                                        {follower.username}
                                        <br />
                                        <button type="button" className="btn btn-primary">
                                            Follow
                                    </button>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Followers;
