import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
  const [currentUserInfo, setCurrentUserInfo] = useState({ username: null });
  const [tempInfo, setTempInfo] = useState();
  const [loginState, setLoginState] = useState("Welcome, please sign in.");

  const [startup, setStartup] = useState(false);

  useEffect(() => {
    if (currentUser === undefined) return;
    const userId = currentUser.uid;
    if (userId) {
      database.ref('/users/' + userId).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        if (userData === null || Object.keys(userData).length <= 1) {
          // New user redirect
          if (userData === null) {
            initializeUser(currentUser.email);
          }
          if (window.location.href.toLowerCase() !== origin + "/createprofile/" && window.location.href.toLowerCase() !== origin + "/createprofile") {
            window.location.href = origin + "/CreateProfile/";
          }
        } else {
          // Existing user redirect
          if (JSON.stringify(currentUserInfo) !== JSON.stringify(userData)) {
            setCurrentUserInfo(userData);
          }
          setLoginState("Signed in as " + userData.username);
          if (window.location.href === origin + "/" || window.location.href.toLowerCase() === origin + "/signup" || window.location.href === origin || window.location.href.toLowerCase() === origin + "/signup/" || window.location.href.toLowerCase() === origin + "/createprofile/" || window.location.href.toLowerCase() === origin + "/createprofile") {
            window.location.href = origin + "/categories/";
          }
        };
      });
    }
  }, [currentUser]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (startup === true && user === auth.currentUser) return;
      setStartup(true);
      if (user) {
        setCurrentUser(user);
      } else {
        // No user is signed in.
        if (window.location.href !== origin + "/" && window.location.href.toLowerCase() !== origin + "/signup" && window.location.href !== origin && window.location.href.toLowerCase() !== origin + "/signup/") {
          window.location.href = origin;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/profile/").set({
      username: tempInfo.username,
      profile_picture: tempInfo.url
    });
  }, [tempInfo])

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
        window.location.href = origin + "/categories/";
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
      setLoginState("Welcome, please sign in");
      window.location.href = window.location.origin;
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <Router>
      <div>
        <Route exact path="/" render={
          (props) => (
            <Login signInUser={signInUser} />
          )} />
        <Route exact path="/categories/" render={
          (props) => (
            <Categories Twitch={Twitch} />
          )} />
        <Route exact path="/CreateProfile/" render={
          (props) => (
            <CreateProfile storeBlob={storeBlob} />
          )} />
        <Route exact path="/EditProfile" render={
          (props) => (
            <EditProfile user={currentUserInfo} />
          )} />
        <Route exact path="/SignUp" render={
          (props) => (
            <SignUp signUpUser={signUpUser} />
          )} />
        <Route exact path="/Feed" render={
          (props) => (
            <Feed user={currentUserInfo} />
          )} />
      </div>
    </Router>
  );
}

export default App;
