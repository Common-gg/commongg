import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import Categories from './pages/Categories.js';
import SignUp from "./pages/SignUp";
import Feed from './pages/Feed.js';
import Followers from './pages/Followers.js';
import Following from './pages/Following.js';
import ViewPost from './pages/ViewPost.js';

const Twitch = require("./api/Twitch.js");

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

function App() {

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };

  if (!firebase.default.apps.length) {
    firebase.default.initializeApp(firebaseConfig);
  }

  const auth = firebase.default.auth();
  const database = firebase.default.database();
  const storage = firebase.default.storage();

  const [currentUser, setCurrentUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [tempInfo, setTempInfo] = useState();
  const [tempGames, setTempGames] = useState();
  const [createPost, setCreatePost] = useState();

  const [startup, setStartup] = useState(false);

  const [twitchToken, setTwitchToken] = useState();

  useEffect(() => {
    if (currentUser === undefined || currentUser === null) return;
    const userId = currentUser.uid;
    if (userId) {
      database.ref('/users/' + userId).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        if (userData === null || Object.keys(userData).length <= 1) {
          // New user
          if (userData === null) {
            initializeUser(currentUser.email);
          }
        } else {
          // Existing user
          if (JSON.stringify(currentUserInfo) !== JSON.stringify(userData)) {
            setCurrentUserInfo(userData);
          }
        };
      });
    }
  }, [currentUser]);

  useEffect(() => {
    Twitch.getToken(process.env.GET_TOKEN, (res, err) => {
      if (err) console.log(err);
      setTwitchToken(res.body.access_token);
    });
    setInterval(() => {
      Twitch.validate(process.env.TWITCH_VALIDATE_URL, twitchToken, (res, err) => {
        if (err) console.log(err);
      })
    }, 590000);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (startup === true && user === auth.currentUser) return;
      setStartup(true);
      setCurrentUser(user);
    });
  }, []);

  /*useEffect(() => {
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/following/").set({
      following: tempFollowing
    });
    setCurrentUserInfo({
      ...currentUserInfo,
      following: tempFollowing
    })
  }, [tempFollowing]);*/

  useEffect(() => {
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/profile/").set({
      username: tempInfo.username,
      profile_picture: tempInfo.url,
      about_me: tempInfo.aboutMe,
    });
    setCurrentUserInfo({
      ...currentUserInfo,
      profile: tempInfo
    })
  }, [tempInfo])

  useEffect(() => {
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/games/").set(tempGames);
    setCurrentUserInfo({
      ...currentUserInfo,
      games: tempGames
    })
  }, [tempGames])

  useEffect(() => {
    if (currentUser === undefined) return;
    const postRef = database.ref('/content/posts/').push();
    postRef.set(createPost);
  }, [createPost]);

  const signUpUser = (email, password) => {
    window.history.pushState(null, null, "/");
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  }

  const initializeUser = (email) => {
    if (currentUser.uid) {
      database.ref('users/' + currentUser.uid).set({
        email: email,
        profile: {},
        games: {},
        followers: [],
        following: [],
        followCounts: {
          follower: 0,
          following: 0
        }
      });
      setCurrentUserInfo({ email: email });
    }
  }

  const storeBlob = (username, blob, aboutMe = "") => {
    const storageRef = storage.ref();
    const ref = storageRef.child("users/" + currentUser.uid);
    ref.put(blob).then(function () {
      ref.getDownloadURL().then(function (url) {
        setTempInfo({ username: username, url: url, aboutMe: aboutMe });
      });
    });
  }

  const storeImage = (image, callback) => {
    const storageRef = storage.ref();
    let imgId = URL.createObjectURL(image).split('/');
    imgId = imgId[imgId.length - 1];
    const ref = storageRef.child(`postImage/${imgId}`);
    ref.put(image).then(function () {
      ref.getDownloadURL().then(function (url) {
        return callback(url);
      });
    });
  }

  const signInUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  const signOut = () => {
    auth.signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  const getUser = (userId, callback) => {
    // Gets user from DB
    database.ref('/users/' + userId).once('value').then(function (snapshot) {
      const userData = snapshot.val();
      if (userData !== null) return callback(userData);
    })
  }

  const followUser = (follower, followed) => {
    const followerRef = database.ref('/users/' + follower + '/following/').push();
    const followedRef = database.ref('/users/' + followed + '/followers/').push();

    followerRef.set(followed);
    followedRef.set(follower);
  }

  const unFollowUser = (follower, followed) => {
    const followerRef = database.ref('/users/' + follower + '/following/');
    const followedRef = database.ref('/users/' + followed + '/followers/');

    followerRef.once('value').then(function (snapshot) {
      let followingList = snapshot.val();
      const followStamp = Object.keys(followingList)[Object.values(followingList).indexOf(followed)];
      followerRef.set({ ...followingList, [followStamp]: null });
    });
    followedRef.once('value').then(function (snapshot) {
      let followerList = snapshot.val();
      const followStamp = Object.keys(followerList)[Object.values(followerList).indexOf(follower)];
      followedRef.set({ ...followerList, [followStamp]: null });
    });
  }

  if (currentUser === undefined || (currentUserInfo === undefined && currentUser !== null)) {
    return (<div></div>)
  } else if (currentUser === null) {
    return (
      <Router>
        <Switch>
          <Route exact path="/SignUp" render={
            (props) => (
              <SignUp signUpUser={signUpUser} />
            )} />
          <Route path="/" render={
            (props) => (
              <Login signInUser={signInUser} />
            )} />
        </Switch>
      </Router>
    )
  } else if (currentUserInfo.profile === undefined) {
    return (
      <Router>
        <Switch>
          <Route path="/" render={
            (props) => (
              <CreateProfile storeBlob={storeBlob} />
            )} />
        </Switch>
      </Router>
    )
  } else if (currentUserInfo.games === undefined) {
    return (
      <Router>
        <Switch>
          <Route path="/" render={
            (props) => (
              <Categories Twitch={Twitch} twitchToken={twitchToken} storeUserGames={setTempGames} />
            )} />
        </Switch>
      </Router>
    )
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/EditProfile" render={
            (props) => (
              <EditProfile user={currentUserInfo} currentUserId={currentUser.uid} signOut={signOut} storeBlob={storeBlob} />
            )} />
          <Route exact path="/Post" render={
            (props) => (
              <ViewPost />
            )} />
          <Route path="/Followers" render={
            (props) => (
              <Followers getUser={getUser} currentUser={currentUser.uid} currentUserInfo={currentUserInfo} signOut={signOut} />
            )} />
          <Route path="/Following" render={
            (props) => (
              <Following getUser={getUser} currentUser={currentUser.uid} currentUserInfo={currentUserInfo} signOut={signOut} />
            )} />
          <Route path="/Profile" render={
            (props) => (
              <Profile getUser={getUser} currentUser={currentUser.uid} signOut={signOut} followUser={followUser} unFollowUser={unFollowUser} />
            )} />
          <Route path="/" render={
            (props) => (
              <Feed currentUserId={currentUser.uid} signOut={signOut} currentUserInfo={currentUserInfo} setCreatePost={setCreatePost} storeImage={storeImage} />
            )} />
        </Switch>
      </Router>
    );
  }
}

export default App;