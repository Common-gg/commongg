import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import Profile from './pages/Profile.js';
import EditProfile from './pages/EditProfile.js';
import Categories from './pages/Categories.js';
import SignUp from "./pages/SignUp"

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage")


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
  const [currentUserInfo, setCurrentUserInfo] = useState({ first_name: null });

  const [loginState, setLoginState] = useState("Welcome, please sign in.");

  const [startup, setStartup] = useState(false);

  useEffect(() => {
    if (currentUser === undefined) return;
    const userId = currentUser.uid;
    if (userId) {
      database.ref('/users/' + userId).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        if (userData === null) {
          // New user redirect
          initializeUser(currentUser.email)
          window.location.href = origin + "/CreateProfile/";
        } else {
          // Existing user redirect
          if (userData.personal) {
            if (JSON.stringify(currentUserInfo) !== JSON.stringify(userData)) {
              setCurrentUserInfo(userData);
              setLoginState("Signed in as " + userData.personal.first_name + " " + userData.personal.last_name);
            };
          } else {
            setLoginState("needs more info");
          }
        }
      });
    }
  }, [currentUser]);

  auth.onAuthStateChanged(function (user) {
    console.log(user);
    if (startup === true && user === auth.currentUser) return;
    setStartup(true);
    if (user) {
      setCurrentUser(user);
    } else {
      // No user is signed in.
      if (window.location.href !== origin && window.location.href !== origin + "/SignUp") {
        window.location.href = origin;
      }
    }
  });

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
    }
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
        <Route exact path="/categories/" component={Categories} />
        <Route exact path="/CreateProfile/" component={CreateProfile} />
        <Route exact path="/EditProfile" render={
          (props) => (
            <EditProfile user={currentUserInfo} />
          )} />
         <Route exact path="/SignUp" render={
                    (props) => (
                        <SignUp signUpUser={signUpUser} />
                    )} />
      </div>
    </Router>
  );
}

export default App;
