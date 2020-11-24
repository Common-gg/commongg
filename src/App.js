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

const Twitch = require("./api/Twitch.js");

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

function App() {

  const origin = window.location.origin

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

  const [startup, setStartup] = useState(false);

  const [twitchToken, setTwitchToken] = useState();

  useEffect(() => {
    if (currentUser === undefined || currentUser === null) return;
    const userId = currentUser.uid;
    if (userId) {
      database.ref('/users/' + userId).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        if (userData === null || Object.keys(userData).length <= 1) {
          // New user redirect
          if (userData === null) {
            initializeUser(currentUser.email);
          }
        } else {
          // Existing user redirect
          if (JSON.stringify(currentUserInfo) !== JSON.stringify(userData)) {
            console.log("SETTING INFO")
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

  useEffect(() => {
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/profile/").set({
      username: tempInfo.username,
      profile_picture: tempInfo.url
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

  const signUpUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  }

  const initializeUser = (email) => {
    console.log(currentUser)
    if (currentUser.uid) {
      database.ref('users/' + currentUser.uid).set({
        email: email
      });
      setCurrentUserInfo({ email: email });
    }
  }

  const storeBlob = (username, blob) => {
    const storageRef = storage.ref();
    const ref = storageRef.child("users/" + currentUser.uid);
    ref.put(blob).then(function () {
      ref.getDownloadURL().then(function (url) {
        setTempInfo({ username: username, url: url });
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
  if(currentUser === undefined) {
  return(<div></div>)
  } else if (currentUser === null) {
    return (
      <Router>
        <Switch>
          <div>
            <Route exact path="/" render={
              (props) => (
                <Login signInUser={signInUser} />
              )} />
            <Route exact path="/SignUp" render={
              (props) => (
                <SignUp signUpUser={signUpUser} />
              )} />
          </div>
        </Switch>
      </Router>
    )
  } else if (currentUserInfo.profile === undefined) {
    return (
      <Router>
          <div>
            <Route path="/" render={
              (props) => (
                <CreateProfile storeBlob={storeBlob} />
              )} />
          </div>
      </Router>
    )
  } else if (currentUserInfo.games === undefined) {
    return (
      <Router>
          <div>
            <Route path="/" render={
              (props) => (
                <Categories Twitch={Twitch} twitchToken={twitchToken} storeUserGames={setTempGames} />
              )} />
          </div>
      </Router>
    )
  } else {
    return (
      <Router>
          <div>
            <Route exact path="/EditProfile" render={
              (props) => (
                <EditProfile user={currentUserInfo} />
              )} />
            <Route exact path="/" render={
              (props) => (
                <Feed user={currentUserInfo} currentUserInfo={currentUserInfo} />
              )} />
          </div>
      </Router>
    );
  }
}

export default App;
