import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import SignUp from "./pages/SignUp";
import PageContainer from './pages/PageContainer';
import firebase from "firebase/app";
import TeamfightTactics from "./images/games/Teamfight Tactics.jpg";
import CommonChat from "./images/games/Common Chat.png";
import defaultPfp from "./images/icons/empty-pfp-1.png";
import ForgotPassword from './pages/ForgotPassword.js';
import ChangePassword from './pages/ChangePassword.js';
import TermsOfService from './pages/TermsOfService.js';
import VerifyEmail from './pages/VerifyEmail.js';
import ReminderVerifyEmail from './pages/ReminderVerifyEmail.js';
import { data } from 'jquery';

const Twitch = require("./api/Twitch.js");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");
require("firebase/analytics")

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
  const analytics = firebase.default.analytics();
  const [currentUser, setCurrentUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [startUp, setStartUp] = useState(false);

  const [twitchToken, setTwitchToken] = useState();
  const [allGames, setAllGames] = useState([
    {
      title: "Common Chat",
      image: CommonChat
    },
    {
      title: "TFT",
      image: TeamfightTactics
    }
  ]);

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
    // Twitch.getToken(process.env.GET_TOKEN, (res, err) => {
    //   setTwitchToken(res.body.access_token);
    // });
    // setInterval(() => {
    //   Twitch.validate(process.env.TWITCH_VALIDATE_URL, twitchToken, (res, err) => {
    //   })
    // }, 590000);
  }, []);

  useEffect(() => {
    // Sets currentUser to the logged in user
    auth.onAuthStateChanged(function (user) {
      if (startUp && user === auth.currentUser) return;
      setStartUp(true);
      setCurrentUser(user);
    });
  }, []);

  const firebaseTimeStamp = () => {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  const addNotification = (targetUserID, type, locationID = "") => {

    if (currentUser.uid === targetUserID) return;

    database.ref(`/users/${targetUserID}/notifications/unread`).push({
      userID: currentUser.uid,
      type: type,
      timestamp: firebaseTimeStamp(),
      locationID: locationID
    });
  }

  const deleteNotification = (notificationID) => {
    database.ref(`/users/${currentUser.uid}/notifications/read/${notificationID}`).remove();
  }

  const readNotifications = () => {
    const oldRef = database.ref(`/users/${currentUser.uid}/notifications/unread`);

    oldRef.once("value", (snapshot) => {
      const unreadNotifications = snapshot.val();

      oldRef.remove();

      const newRef = database.ref(`/users/${currentUser.uid}/notifications/read`);

      newRef.once("value", (snapshot_2) => {
        const readNotifications = snapshot_2.val();
        newRef.set({
          ...readNotifications,
          ...unreadNotifications
        });
      });
    });
  }

  const notificationListener = (callback) => {

    database.ref(`/users/${currentUser.uid}/notifications/read`).once("value", (snapshot) => {
      callback(snapshot.val(), "read");

      database.ref(`/users/${currentUser.uid}/notifications/unread`).on("child_added", (data) => {
        callback({ [data.key]: data.val() }, "unread");
      });
    });
  }


  const signUpUser = (email, password) => {
    // Signs user up
    window.history.pushState(null, null, "/");
    analytics.logEvent("signup")
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      sendVerifyEmail();
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      //todo:: implement logic here to tell user they couldnt sign up 
    });
  }

  const sendVerifyEmail = () => {
    auth.currentUser.sendEmailVerification().then(() => {
    })
      .catch((error) => {
      })
  }

  const handleVerifyEmail = (actionCode, callback) => {
    auth.applyActionCode(actionCode).then((resp) => {
      window.history.pushState(null, null, "/");
      setCurrentUser({ ...currentUser, emailVerified: true })
      return callback(true);
    }).catch((error) => {
      return callback(false);
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
        followers: [],
        following: [],
        followCounts: {
          follower: 0,
          following: 0
        }
      });
      setCurrentUserInfo({
        email: email,
        username: "",
        profile_picture: "",
        about_me: "",
        followers: [],
        following: [],
        followCounts: {
          follower: 0,
          following: 0
        }
      });
    }
  }

  const storeUserProfile = (username, url, aboutMe) => {
    // stores profile data for the user
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid).set({
      ...currentUserInfo,
      username: username,
      lower: username.toLowerCase(),
      profile_picture: url,
      about_me: aboutMe,
    });
    setCurrentUserInfo({
      ...currentUserInfo,
      username: username,
      lower: username.toLowerCase(),
      profile_picture: url,
      about_me: aboutMe
    });
  }

  const storeUserAboutMe = (aboutMe) => {
    // stores profile data for the user
    if (currentUser === undefined) return;
    database.ref('users/' + currentUser.uid + '/about_me').set(aboutMe);
    setCurrentUserInfo({
      ...currentUserInfo,
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

  const storeBlob = (username, blob, aboutMe) => {
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

  const signInUser = (email, password, callback) => {
    // logs the user in
    auth.signInWithEmailAndPassword(email, password).then(() => {
      analytics.logEvent("login_success")
      return callback(true);
    }).catch((error) => {
      analytics.logEvent("login_fail")
      return callback(false);
    });
  }

  const signOut = () => {
    // logs the user out
    auth.signOut().then(function () {
      // Sign-out successful.
      analytics.logEvent("signout_success")
    }).catch(function (error) {
      analytics.logEvent("signout_failed")
      // An error happened.
    });
  }

  const createPost = (post) => {
    // Creates a post in the DB
    if (currentUser === undefined) return;
    const postRef = database.ref('/content/posts/').push();
    postRef.set(post);
    document.getElementById("createPostX").click();
    analytics.logEvent("post_created")
  }

  const updateNumComments = (postId, numIncrement) => {
    const numCommentsRef = database.ref('/content/posts/' + postId + '/numComments')
    if (numCommentsRef === undefined) {
      return;
    }
    numCommentsRef.set(firebase.database.ServerValue.increment(numIncrement));
  }

  const createComment = (comment, postAuthorID) => {
    // Creates a comment in the DB
    if (currentUser === undefined) return;
    const commentRef = database.ref('/content/comments/').push();
    commentRef.set(comment);
    analytics.logEvent("comment_added")
    //update the number of comments
    updateNumComments(comment.postId, 1);
    addNotification(postAuthorID, "comment", comment.postId);
  }

  const deleteComment = (commentId, postId) => {
    // Deletes a comment in the DB
    if (currentUser === undefined) return;
    if (commentId === undefined || commentId === "") return;
    const commentRef = database.ref('/content/comments/' + commentId);
    commentRef.remove();
    analytics.logEvent("comment_deleted")
    //update the number of comments
    updateNumComments(postId, -1);
  }

  //delete post with post id
  const deletePost = (postId) => {
    // Deletes a post in the DB
    if (currentUser === undefined) return;
    if (postId === undefined || postId === "") return;
    const postRef = database.ref('/content/posts/' + postId);
    postRef.remove();
    analytics.logEvent("post_deleted")
  }

  const getUser = (userId, callback) => {
    // Gets user from DB
    database.ref('/users/' + userId).once('value').then(function (snapshot) {
      const userData = snapshot.val();
      if (userData !== null) return callback(userData);
    })
  }

  const getUserWithId = (id) => {
    // checks if there is a user with the username already
    // returns true if it exists false if doesn't exist
    return new Promise(function (resolve, reject) {
      database.ref('/users/' + id).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        //if it's not null, there is some user with the username 
        if (userData !== null) {
          return resolve({ ...userData, id: id });
        } else {
          return resolve(null);
        }
      })
    })
  }

  const getUserWithUsername = (username) => {
    // checks if there is a user with the username already
    // returns true if it exists false if doesn't exist
    return new Promise(function (resolve, reject) {
      database.ref('/users/').orderByChild("username").equalTo(username).once('value').then(function (snapshot) {
        const userData = snapshot.val();
        //if it's not null, there is some user with the username 
        if (userData !== null) {
          return resolve({ ...userData});
        } else {
          return resolve(null);
        }
      })
    })
  }

  const updateFollow = (userId, followType, value) => {
    const followRef = database.ref('/users/' + userId + '/followCounts').child(followType)
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
    setCurrentUserInfo({
      ...currentUserInfo,
      followCounts: {
        follower: currentUserInfo.followCounts.follower,
        following: currentUserInfo.followCounts.following + 1
      },
      following: {
        ...currentUserInfo.following,
        [firebaseTimeStamp()]: followed
      }
    })
    addNotification(followed, "followed", currentUser.uid);
    analytics.logEvent("Users_followed")
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
    analytics.logEvent("Users_unfollowed")
    setCurrentUserInfo({
      ...currentUserInfo,
      followCounts: {
        follower: currentUserInfo.followCounts.follower + 1,
        following: currentUserInfo.followCounts.following
      }
    })
  }

  const getTitleOfGameById = (gameId) => {
    // Gets the title of a game by it's ID
    let gameTitle = "";

    database.ref("/games/").once("value").then((snapshot) => {
      let games = snapshot.val();

      if (games.hasOwnProperty(gameId)) {
        gameTitle = games[gameId].title;
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

  const getPost = (postId, callback, postType, nullCallBack) => {
    // Gets a single post from DB
    database.ref('/content/' + postType + '/' + postId).once('value').then((snapshot) => {
      const postData = snapshot.val();
      if (postData !== null) return callback(postData);
      if (postData === null && nullCallBack !== undefined) return nullCallBack();
    })
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

  const getAllPosts = (callback) => {
    // gets all posts for the DB
    const postRef = database.ref('/content/posts/');
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

  const reactToPost = (username, postId, reaction, value, setPost, postType, postAuthorID, parentID) => {
    //add to list to reacted
    const reactedRef = database.ref('/content/' + postType + '/' + postId + '/reacted/' + username);
    reactedRef.set(reaction).then(() => {
      //increment the counter for the post
      const reactionRef = database.ref('/content/' + postType + '/' + postId + '/reactions/' + reaction);
      reactionRef.set(firebase.database.ServerValue.increment(value)).then(() => {
        analytics.logEvent("reactions_added")
        getPost(postId, setPost, postType);
      })
    })

    if (parentID !== undefined) {
      addNotification(postAuthorID, `${postType}_reaction`, parentID);
    } else {
      addNotification(postAuthorID, `${postType}_reaction`, postId);
    }
  }

  //unreact to post and decrement
  const unreactToPost = (username, postId, reaction, value, setPost, postType) => {
    //add to list to reacted
    const reactedRef = database.ref('/content/' + postType + '/' + postId + '/reacted/' + username);
    reactedRef.set(null).then(() => {
      //decrement the counter for the post
      const reactionRef = database.ref('/content/' + postType + '/' + postId + '/reactions/' + reaction);
      reactionRef.set(firebase.database.ServerValue.increment(-value)).then(() => {
        //make sure everything is updated on server before gettingp ost
        analytics.logEvent("reactions_unreact")
        getPost(postId, setPost, postType);
      })
    })
  }

  //change the current reaction, decrement old, increment new
  const changeReaction = (username, postId, oldReaction, newReaction, value, setPost, postType) => {
    //set the reaction of user on post to new reaction
    const reactedRef = database.ref('/content/' + postType + '/' + postId + '/reacted/' + username);
    reactedRef.set(newReaction).then(() => {
      //increment the counter for the new emote
      const newReactionRef = database.ref('/content/' + postType + '/' + postId + '/reactions/' + newReaction);
      newReactionRef.set(firebase.database.ServerValue.increment(value)).then(() => {
        //decrementr the counter for old emote
        const oldReactionRef = database.ref('/content/' + postType + '/' + postId + '/reactions/' + oldReaction);
        oldReactionRef.set(firebase.database.ServerValue.increment(-value)).then(() => {
          analytics.logEvent("reactions_changed")
          getPost(postId, setPost, postType);
        })
      })
    })
  }

  const existsEmail = (email) => {
    // checks if there is a user with the email already
    // returns true if it exists false if doesn't exist
    return new Promise(function (resolve, reject) {
      const userRef = database.ref('/users/').orderByChild("email").equalTo(email);
      userRef.once('value').then((snapshot) => {
        const usersWithEmail = snapshot.val();

        //if it's not null, there is some user with the email
        if (usersWithEmail !== null) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    })
  }

  const existsUsername = (username) => {
    // checks if there is a user with the username already
    // returns true if it exists false if doesn't exist
    return new Promise(function (resolve, reject) {
      const userRef = database.ref('/users/').orderByChild("username").equalTo(username);
      userRef.once('value').then((snapshot) => {
        const usersWithUsername = snapshot.val();

        //if it's not null, there is some user with the username 
        if (usersWithUsername !== null) {
          return resolve(true);
        } else {
          const reservedRef = database.ref('/reservedNames/' + username);
          reservedRef.once('value').then((snap2) => {
            if (snap2.val() !== null) return resolve(true)
            return resolve(false);
          })
        }
      });
    })
  }

  const getComments = (filter, sort, callback) => {
    // gets comments from db
    const postRef = database.ref('/content/comments/').orderByChild(sort).equalTo(filter);
    postRef.once('value', function (snapshot) {
      if (snapshot.val() !== null) return callback(snapshot.val());
    });
  }

  const getComment = (commentId, callback) => {
    // Gets a single comment from DB
    database.ref('/content/comments/' + commentId).once('value').then((snapshot) => {
      const commentData = snapshot.val();
      if (commentData !== null) return callback(commentData);
    })
  }

  const search = (value, callback, query) => {
    // search the db
    const usersRef = database.ref('/users/').orderByChild('lower').startAt(value.toLowerCase()).endAt(value.toLowerCase() + "\uf8ff");
    usersRef.once('value', function (snapshot) {
      if (snapshot.val() !== null) {
        analytics.logEvent("query_results_found")
        return callback(snapshot.val(), query);
      } else {
        //return empty object since no result
        analytics.logEvent("query_results_empty")
        return callback({}, query);
      }
    });
  }

  const resetPasswordEmail = (userEmail, callback) => {
    auth.sendPasswordResetEmail(userEmail).then(() => {
      analytics.logEvent("resetPasswordemail_success")
      return callback(true);
    }).catch(function () {
      analytics.logEvent("resetPasswordemail_fail")
      return callback(false);
    });
  }

  const handleResetPassword = (oobCode, newPassword, isSuccess) => {
    auth.verifyPasswordResetCode(oobCode).then((email) => {
      auth.confirmPasswordReset(oobCode, newPassword).then((resp) => {
        // Enter this block if reset was successful
        analytics.logEvent("handleResetPassword_success")
        return isSuccess(true);
      }).catch(() => {
        // Enter this block if password is too weak
        analytics.logEvent("handleResetPassword_tooweak")
        return isSuccess(false);
      });
    }).catch(() => {
      // Enter this block if the action code is invalid or expired
      analytics.logEvent("handleResetPassword_invalid")
      return isSuccess(false);
    });
  }

  const changePasswordFromSettingsPage = (oldPassword, newPassword, isSuccess) => {
    auth.signInWithEmailAndPassword(currentUser.email, oldPassword).then((user) => {
      auth.currentUser.updatePassword(newPassword).then(() => {
        // password reset successful
        analytics.logEvent("changePasswordFromSettingsPage_success")
        return isSuccess(true);
      }).catch((err) => {
        analytics.logEvent("changePasswordFromSettingsPage_fail")
        return isSuccess(false);
      });
    }).catch((err) => {
      analytics.logEvent("changePasswordFromSettingsPage_fail2")
      return isSuccess(false);
    });
  }

  const setModerationLevel = (userId, level) => {
    database.ref('/users/' + userId).update({moderationLevel: level});
  }

  const verifyUser = (userId, verified) => {
    database.ref('/users/' + userId).update({verified: verified});
  }

  const report = (type, id) => {
    database.ref('/' + type + '/' + id).update({reported: true, reports: firebase.database.ServerValue.increment(1)});
  }

  const clearReports = (type, id) => {
    database.ref('/' + type + '/' + id).update({reported: false, reports: 0});
  }

  const resetPfp = (userId) => {
    database.ref('/users/' + userId).update({profile_picture: defaultPfp});
  }

  const getReportedUsers = (callback) => {
    const usersRef = database.ref('/users/').orderByChild("reported").equalTo(true);
    usersRef.once('value', function (snapshot) {
      if (snapshot.val() != null) {
        return callback(snapshot.val());
      }
    })
  }

  if (currentUser === undefined || (currentUserInfo === undefined && currentUser !== null)) {
    return (<div></div>)
  } else if (currentUser === null) {
    return (
      <Router>
        <Switch>
          <Route exact path="/SignUp" render={
            (props) => (
              <SignUp signUpUser={signUpUser} existsEmail={existsEmail} />
            )} />
          <Route path="/verifyemail" render={
            (props) => (
              <VerifyEmail handleVerifyEmail={handleVerifyEmail} />
            )} />
          <Route path="/forgotpassword" render={
            (props) => (
              <ForgotPassword resetPasswordEmail={resetPasswordEmail} />
            )} />
          <Route path="/changepassword" render={
            (props) => (
              <ChangePassword handleResetPassword={handleResetPassword} />
            )} />
          <Route path="/" render={
            (props) => (
              <Login signInUser={signInUser} />
            )} />
        </Switch>
      </Router>
    )
  } else if (!currentUser.emailVerified) {
    return (
      <Router>
        <Switch>
          {console.log(auth.currentUser.emailVerified)}
          <Route path="/verifyemail" render={
            (props) => (
              <VerifyEmail handleVerifyEmail={handleVerifyEmail} />
            )} />
          <Route path="/" render={
            (props) => (
              <ReminderVerifyEmail sendVerifyEmail={sendVerifyEmail} />
            )
          } />
        </Switch>
      </Router>
    );
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
          <Route path="/termsofservice" render={
            (props) => (
              <TermsOfService />
            )}
          />
          <Route path="/" render={
            (props) => (
              <div>
                <PageContainer
                  currentUserId={currentUser.uid}
                  currentUserInfo={currentUserInfo}

                  allGames={allGames}
                  setAllGames={setAllGames}

                  signOut={signOut}

                  getPosts={getPosts}
                  getAllPosts={getAllPosts}
                  getPost={getPost}
                  reactToPost={reactToPost}
                  unreactToPost={unreactToPost}
                  changeReaction={changeReaction}
                  createPost={createPost}
                  createComment={createComment}
                  deleteComment={deleteComment}
                  deletePost={deletePost}
                  updateNumComments={updateNumComments}
                  getComments={getComments}
                  getComment={getComment}
                  search={search}

                  storeImage={storeImage}
                  storeBlob={storeBlob}

                  getUser={getUser}
                  getUserWithId={getUserWithId}
                  getUserWithUsername={getUserWithUsername}
                  followUser={followUser}
                  unFollowUser={unFollowUser}
                  storeUserGames={storeUserGames}
                  storeUserAboutMe={storeUserAboutMe}

                  changePasswordFromSettingsPage={changePasswordFromSettingsPage}

                  notificationListener={notificationListener}
                  deleteNotification={deleteNotification}
                  addNotification={addNotification}
                  readNotifications={readNotifications}
                  firebaseTimeStamp={firebaseTimeStamp}

                  setModerationLevel={setModerationLevel}
                  report={report}
                  clearReports={clearReports}
                  verifyUser={verifyUser}
                  resetPfp={resetPfp}
                  getReportedUsers={getReportedUsers}
                />
              </div>
            )} />
        </Switch>
      </Router>
    );
  }
}

export default App;