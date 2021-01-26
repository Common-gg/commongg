import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import SignUp from "./pages/SignUp";
import PageContainer from './pages/PageContainer';
import MobileWarning from './pages/MobileWarning';
import firebase from "firebase/app";
import TeamfightTactics from "./images/games/Teamfight Tactics.jpg";
import TeamfightTacticsIcon from "./images/icons/tft-1.png";
import TeamfightTacticsWhiteIcon from "./images/icons/tftwhite-1.png";
import CommonChat from "./images/games/Common Chat.png";
import CommonChatIcon from "./images/icons/chat-1.png";
import CommonChatWhiteIcon from "./images/icons/chatwhite-1.png";
import TFTGameCard from "./images/icons/TFTGameCard.png";
import CCGameCard from "./images/icons/CCGameCard.png";
import defaultPfp from "./images/icons/empty-pfp-1.png";
import ForgotPassword from './pages/ForgotPassword.js';
import ActionHandler from "./pages/ActionHandler.js";
import TermsOfService from './pages/TermsOfService.js';
import ReminderVerifyEmail from './pages/ReminderVerifyEmail.js';
import Sidebar from './components/Sidebar.js';

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
  const [displayMobileWarning, setDisplayMobileWarning] = useState(false);
  const [allGames, setAllGames] = useState([
    {
      title: "Common Chat",
      image: CommonChat,
      icon: CommonChatIcon,
      whiteIcon: CommonChatWhiteIcon,
      gameCard: CCGameCard
    },
    {
      title: "Teamfight Tactics",
      image: TeamfightTactics,
      icon: TeamfightTacticsIcon,
      whiteIcon: TeamfightTacticsWhiteIcon,
      gameCard: TFTGameCard
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
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    if (check) setDisplayMobileWarning(true);
    let oldUrl = "https://common-gg.web.app/";
    let currentPath = window.location.href;
    if (currentPath.includes(oldUrl)) {
      let urlPath = currentPath.substring(currentPath.indexOf(oldUrl) + oldUrl.length);
      window.location.replace("https://common.gg/" + urlPath);
    }
  }, []);

  useEffect(() => {
    // Sets currentUser to the logged in user
    auth.onAuthStateChanged(function (user) {
      if (startUp && user === auth.currentUser) return;
      setStartUp(true);
      setCurrentUser(user);
    });
  }, []);


  const firebaseTimeStamp = (callback) => {
    database.ref("/.info/serverTimeOffset").on('value', function (offset) {
      let offsetVal = offset.val() || 0;
      return callback(9999999999999 - Date.now() + offsetVal);
    });
  }

  const convertTimeStamp = (timestamp) => {
    return 9999999999999 - timestamp;
  }

  const addNotification = (targetUserID, type, locationID = "") => {

    if (currentUser.uid === targetUserID) return;
    firebaseTimeStamp(storeNotification);
    function storeNotification(timestamp) {
      database.ref(`/users/${targetUserID}/notifications/unread/${currentUser.uid + type + locationID}`).update({
        userID: currentUser.uid,
        type: type,
        timestamp: timestamp,
        locationID: locationID
      });
    }
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

  const ERROR_CODE_ENUM = {
    "success": 0,
    "auth/email-already-in-use": 1,
    "auth/invalid-email": 2,
    "auth/operation-not-allowed": 3,
    "auth/weak-password": 4
  }

  const signUpUser = (email, password, callback) => {
    // Signs user up
    window.history.pushState(null, null, "/");
    analytics.logEvent("signup")
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      sendVerifyEmail(() => { });
      return callback(ERROR_CODE_ENUM["success"]);
    }).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      return callback({ ErrorCode: ERROR_CODE_ENUM[errorCode], ErrorMessage: errorMessage });
      //todo:: implement logic here to tell user they couldnt sign up 
    });
  }

  const sendVerifyEmail = (callback) => {
    auth.currentUser.sendEmailVerification().then(() => {
      return callback(true);
    }).catch((error) => {
      return callback(false);
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
    //delete the comments with the post
    const commentsRef = database.ref('/content/comments/').orderByChild("postId").equalTo(postId);
    commentsRef.once('value', function (snapshot) {
      const comments = snapshot.val()
      if (comments !== null) {
        Object.keys(comments).forEach((comment) => {
          const commentRef = database.ref('/content/comments/' + comment);
          commentRef.remove();
          analytics.logEvent("comment_deleted")
        })
      }
    });
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
          return resolve({ ...userData });
        } else {
          return resolve(null);
        }
      })
    })
  }

  //we want to retrieve both the user and the unique id with the user
  const getUserWithLower = (username, setUser, setPageId) => {
    //this time we don't return pormise
    database.ref('/users/').orderByChild("lower").equalTo(username.toLowerCase()).once('value').then(function (snapshot) {
      const userData = snapshot.val();
      //if it's not null, there is some user with the username 
      if (userData !== null) {
        //the returned object has structure of object with value of unique id
        const id = Object.keys(userData)[0];
        const user = [...Object.values(userData)][0];
        user.id = id;
        // we set the pageId and set the user
        setPageId(id);
        setUser(user);
      } else {
        setPageId(null);
        setUser({ profile: [], games: [], followCounts: {} });
        return null;
      }
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
        [9999999999999 - Date.now()]: followed
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

  const getPost = (postId, callback, postType, nullCallBack) => {
    // Gets a single post from DB
    database.ref('/content/' + postType + '/' + postId).once('value').then((snapshot) => {
      const postData = snapshot.val();
      if (postData !== null) return callback(postData);
      if (postData === null && nullCallBack !== undefined) return nullCallBack();
    })
  }

  const getPosts = (begin, filter, callback) => {
    // gets all posts for the DB
    let postRef = database.ref('/content/posts/');
    postRef = postRef.orderByChild("timestamp").startAt(begin);
    postRef = postRef.limitToFirst(filter);
    postRef.on('value', function (snapshot) {
      postRef.off();
      if (snapshot.val() !== null) {
        let postData = {};
        snapshot.forEach(function (child) {
          postData[child.val().timestamp] = { ...child.val(), postId: child.key };
        });
        return callback(postData);
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

  const existsUsername = (original) => {
    // checks if there is a user with the username already
    // returns true if it exists false if doesn't exist
    //username is the lowercase of the actual input
    const username = original.toLowerCase();
    return new Promise(function (resolve, reject) {
      //check for user
      const userRef = database.ref('/users/').orderByChild("lower").equalTo(username);
      userRef.once('value').then((snapshot) => {
        const usersWithUsername = snapshot.val();

        //if it's not null, there is some user with the username 
        if (usersWithUsername !== null) {
          return resolve(true);
        } else {
          //check for reserved
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
      if (snapshot.val() === null) return callback({});
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
    database.ref('/users/' + userId).update({ moderationLevel: level });
  }

  const verifyUser = (userId, verified) => {
    database.ref('/users/' + userId).update({ verified: verified });
  }

  const report = (type, id) => {
    database.ref('/' + type + '/' + id).update({ reported: true, reports: firebase.database.ServerValue.increment(1) });
  }

  const clearReports = (type, id) => {
    database.ref('/' + type + '/' + id).update({ reported: false, reports: 0 });
  }

  const resetPfp = (userId) => {
    database.ref('/users/' + userId).update({ profile_picture: defaultPfp });
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
  } else if (displayMobileWarning) {
    return <MobileWarning setDisplayMobileWarning={setDisplayMobileWarning} />
  } else if (currentUser === null) {
    return (
      <Router>
        <Switch>
          <Route exact path="/SignUp" render={
            (props) => (
              <SignUp signUpUser={signUpUser} existsEmail={existsEmail} />
            )} />
          <Route path="/actions/" render={
            (props) => (
              <ActionHandler handleVerifyEmail={handleVerifyEmail} handleResetPassword={handleResetPassword} />
            )} />
          <Route path="/forgotpassword" render={
            (props) => (
              <ForgotPassword resetPasswordEmail={resetPasswordEmail} />
            )} />
          <Route path="/termsofservice" render={
            (props) => (
              <TermsOfService />
            )}
          />
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
          <Route path="/actions" render={
            (props) => (
              <ActionHandler handleVerifyEmail={handleVerifyEmail} handleResetPassword={handleResetPassword} />
            )} />
          <Route path="/" render={
            (props) => (
              <ReminderVerifyEmail sendVerifyEmail={sendVerifyEmail} signOut={signOut} />
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
              <CreateProfile storeUserProfile={storeUserProfile} existsUsername={existsUsername} storeBlob={storeBlob} />
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
              <div id="outer-container"> 
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
                  getUserWithLower={getUserWithLower}
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
                  convertTimeStamp={convertTimeStamp}

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