import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import SignUp from "./pages/SignUp";
import PageContainer from './pages/PageContainer';
import firebase from "firebase/app";

const Twitch = require("./api/Twitch.js");
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
  const [startUp, setStartUp] = useState(false);

  const [twitchToken, setTwitchToken] = useState();

  useEffect(() => {
    // User authentication redirect
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
    // Access the Twitch API
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
    // Sets currentUser to the logged in user
    auth.onAuthStateChanged(function (user) {
      if (startUp && user === auth.currentUser) return;
      setStartUp(true);
      setCurrentUser(user);
    });
  }, []);

  const signUpUser = (email, password) => {
    // Signs user up
    window.history.pushState(null, null, "/");
    auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  }

  const initializeUser = (email) => {
    // initializes signed up user in the db
    if (currentUser.uid) {
      database.ref('users/' + currentUser.uid).set({
        email: email,
        username: "",
        profile_picture: "",
        about_me: "",
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

  const storeUserProfile = (username, url, aboutMe) => {
    // stores profile data for the user
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid).set({
      ...currentUserInfo,
      username: username,
      profile_picture: url,
      about_me: aboutMe,
    });
    setCurrentUserInfo({
      ...currentUserInfo,
      username: username,
      profile_picture: url,
      about_me: aboutMe,
    })
  }

  const storeUserGames = (games) => {
    // stores game data for the user
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + "/games/").set(games);
    setCurrentUserInfo({
      ...currentUserInfo,
      games: games
    })
  }

  const storeBlob = (username, blob, aboutMe = "") => {
    // Stores the user's profile picture
    const storageRef = storage.ref();
    const ref = storageRef.child("users/" + currentUser.uid);
    ref.put(blob).then(function () {
      ref.getDownloadURL().then(function (url) {
        storeUserProfile(username, url, aboutMe);
      });
    });
  }

  const storeImage = (image, callback) => {
    // stores a non-profile_picture image to the db.
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
    // logs the user in
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  const signOut = () => {
    // logs the user out
    auth.signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

  const createPost = (post) => {
    // Creates a post in the DB
    if (currentUser === undefined) return;
    const postRef = database.ref('/content/posts/').push();
    postRef.set(post);
  }

  const updateNumComments = (postId) => {
    const numCommentsRef = database.ref('/content/posts/' + postId + '/numComments')
    if (numCommentsRef === undefined) return;
    numCommentsRef.set(firebase.database.ServerValue.increment(1));
  }

  const createComment = (comment) => {
    // Creates a comment in the DB
    if (currentUser === undefined) return;
    const commentRef = database.ref('/content/comments/').push();
    commentRef.set(comment);
    //update the number of comments
    updateNumComments(comment.postId);
  }

  const getUser = (userId, callback) => {
    // Gets user from DB
    database.ref('/users/' + userId).once('value').then(function (snapshot) {
      const userData = snapshot.val();
      if (userData !== null) return callback(userData);
    })
  }

  const updateFollow = (userId, followType, value) => {
    const followRef = database.ref('/users/' + userId + '/followCounts').child(followType)
    console.log(followRef);
    followRef.set(firebase.database.ServerValue.increment(value));
  }

  const followUser = (follower, followed) => {
    // follows the desired user
    const followerRef = database.ref('/users/' + follower + '/following/').push();
    const followedRef = database.ref('/users/' + followed + '/followers/').push();

    followerRef.set(followed);
    followedRef.set(follower);
    updateFollow(follower, "following", 1);
    updateFollow(followed, "follower", 1);
  }

  const unFollowUser = (follower, followed) => {
    // unfollows the desired user
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
    updateFollow(follower, "following", -1);
    updateFollow(followed, "follower", -1);
  }

  const getTitleOfGameById = (gameId) => {
    // Gets the title of a game by it's ID
    let gameTitle = "";

    database.ref("/games/").once("value").then((snapshot) => {
      let games = snapshot.val();

      if (games.hasOwnProperty(gameId)) {
        gameTitle = games[gameId].title;
      }
      else {
        console.log(`Couldnt find game name for game with ID: ${gameId}`);
      }
      return gameTitle;
    });
  }

  const getAllGames = (callback) => {
    // gets all games from the db
    database.ref("/games/").once("value").then((snapshot) => {
      return callback(snapshot.val());
    });
  }

  const getPosts = (filter, sort, callback) => {
    // gets all posts for the DB
    const postRef = database.ref('/content/posts/').orderByChild(sort).equalTo(filter);
    postRef.once('value', function (snapshot) {
      if (snapshot.val() !== null) {
        return callback(snapshot.val());
      } else {
        return callback({
          "00000000": {
            author: "404",
            caption: "Nothing here",
            game: "",
            link: "",
            text: "There are no posts to see",
            timestamp: 0,
            title: "No Content",
            type: "text"
          }
        })
      }
    });
  }

  const existsUsername = (username) => {
    // checks if there is a user with the username already
    // returns true if it exists false if doesn't exist
    return new Promise(function (resolve, reject) {
      const postRef = database.ref('/users/').orderByChild("username").equalTo(username);
      postRef.once('value').then((snapshot) => {
        const usersWithUsername = snapshot.val();

        //if it's not null, there is some user with the username 
        if (usersWithUsername !== null) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    })
  }

  const getPost = (postId, callback) => {
    // Gets a single post from DB
    database.ref('/content/posts/' + postId).once('value').then((snapshot) => {
      const postData = snapshot.val();
      if (postData !== null) return callback(postData);
    })
  }

  const getComments = (filter, sort, callback) => {
    // gets comments from db
    const postRef = database.ref('/content/comments/').orderByChild(sort).equalTo(filter);
    postRef.once('value', function (snapshot) {
      if (snapshot.val() !== null) return callback(snapshot.val());
    });
  }

  const search = (value, callback, query) => {
    // search the db
    const usersRef = database.ref('/users/').orderByChild('username').startAt(value.toUpperCase()).endAt(value.toLowerCase() + "\uf8ff");
    usersRef.once('value', function (snapshot) {
      console.log(snapshot.val());
      if (snapshot.val() !== null) return callback(snapshot.val(), query);
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
  } else if (currentUserInfo.username === "") {
    return (
      <Router>
        <Switch>
          <Route path="/" render={
            (props) => (
              <CreateProfile existsUsername={existsUsername} storeBlob={storeBlob} />
            )} />
        </Switch>
      </Router>
    )
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" render={
            (props) => (
              <PageContainer
                currentUserId={currentUser.uid}
                currentUserInfo={currentUserInfo}

                signOut={signOut}

                getPosts={getPosts}
                getPost={getPost}
                createPost={createPost}
                createComment={createComment}
                updateNumComments={updateNumComments}
                getComments={getComments}
                search={search}

                storeImage={storeImage}
                storeBlob={storeBlob}

                getUser={getUser}
                followUser={followUser}
                unFollowUser={unFollowUser}
                storeUserGames={storeUserGames}
              />
            )} />
        </Switch>
      </Router>
    );
  }
}

export default App;