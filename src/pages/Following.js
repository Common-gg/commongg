import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Text from '../components/Text.js';
import NavigationBar from '../components/NavigationBar.js';

function Following(props) {

    const [user, setUser] = useState({ profile: [], games: [] });
    const [userId, setUserId] = useState();

    useEffect(() => {
        let url = window.location.href;
        url = url.split('/');
        setUserId(url[url.length - 1]);
        props.getUser(props.currentUserId, setUser);
    }, []);

    useEffect(() => {
        console.log(userId);
        props.getUser(userId, setUser);
    }, [userId]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    function mutualUsers() {
        //return an array of mutual in user and currentUser
        //and an array of nonmutual users
        return [null, null];
    }

    let carrot = {
        username: "Carrot",
        link: "https://firebasestorage.googleapis.com/v0/b/commongg-6cb2a.appspot.com/o/users%2Fymu9NCYepmX0XHbdkMRHuIWnKjg2?alt=media&token=b123394f-6d8b-43a0-8529-6e0d85f2df73"
    }

    let following = [ //array of users
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
        <div className="Following">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="col-lg-2">
                            <NavigationBar currentUserId={props.currentUser} currentUserInfo={props.currentUserInfo} signOut={props.signOut} />
                        </div>
                    </div>
                    <div className="col-7 text-center">
                        <br />
                        <Text text="Mutual Following (remove this if you are the user)" />
                        <div className="row">
                            {following.map(follower => { // replacewith user.following.map later
                                return <div className="col-3">
                                    <img src={user.profile.profile_picture} alt="Avatar" width="100%" />
                                    <br />
                                    {follower.username}
                                    <button type="button" className="btn btn-primary">
                                        Following
                                    </button>
                                </div>
                            })}
                        </div>
                        <br />
                        <br />
                        <Text text="Following" />
                        <div className="row">
                            {following.map(follower => { // replacewith user.following.map later
                                return (
                                    <div className="col-3">
                                        <img src={user.profile.profile_picture} alt="Avatar" width="100%" />
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

export default Following;
