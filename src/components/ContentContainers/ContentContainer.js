import React, { useEffect, useState } from 'react';
import FeedContainer from './FeedContainer.js';
import FollowingContainer from './FollowingContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';
import GamesContainer from './GamesContainer.js';
import PageNotFound from './PageNotFound.js';
import GameFeedContainer from './GameFeedContainer.js';
import ModPostsContainer from './ModPostsContainer.js';
import ModUsersContainer from './ModUsersContainer.js';


function ContentContainer(props) {
  const [pageState, setPageState] = useState("editgames");
  const [pageId, setPageId] = useState();
  const [modLevel, setModLevel] = useState(0);
  const reactions = [
    "thumbsup",
    "Pog",
    "peepoHappy",
    "peepoLove",
    "monkaHmm",
    "pepeLaugh",
    "KEKW",
    "Madge",
    "monkaS",
    "Sadge",
    "influrUWU",
    "AYAYA",
    "agontfHi",
    "agontfConcern",
    "agontfSure",
    "agontfGift",
    "soulessFF",
    "soulessG",
    "emyyAww",
    "emyyHiYo",
    "muffiS",
    "dqaHi",
    "eschatHwak2",
    "josepa3Riot",
    "treebeardMeep",
    "fluffyBlanket"
  ];

  useEffect(() => {
    if (props.currentUserInfo === undefined) return;
    if (props.currentUserInfo.moderationLevel) {
      setModLevel(props.currentUserInfo.moderationLevel);
    }
  }, []);

  useEffect(() => {
    if (props.currentUserInfo !== undefined && (props.currentUserInfo.games === undefined || props.currentUserInfo.games === [])) {
      setPageState("editgames");
      return;
    }
    let url = window.location.href;
    url = url.split('/');
    setPageState(url[3]);
    if (url.length >= 5) {
      //if page state is games check the id
      if (url[3] === "games") {
        //find current title's id which is its index in the array
        const curGameId = props.allGames.findIndex((game) => {
          return game.title.split(" ").join('').toLowerCase() === url[url.length - 1];
        });
        //game id is the index
        setPageId(curGameId.toString());
      } else {
        setPageId(url[url.length - 1]);
      }
    }
  });

  switch (pageState) {
    case "profile":
      return <ProfileContainer {...props} username={pageId} reactions={reactions} />;
    case "post":
      return <ViewPostContainer {...props}
        pageId={pageId}
        setBackClicked={props.setBackClicked}
        pageState={pageState}
        reactions={reactions} />;
    case "settings":
      return <SettingsContainer {...props} />;
    case "editgames":
      return <GamesContainer {...props} reactions={reactions} />;
    case "":
      return <FeedContainer {...props} reactions={reactions} />;
    case "following":
      return <FollowingContainer {...props} reactions={reactions} />;
    case "games":
      return <GameFeedContainer {...props}
        pageId={pageId}
        reactions={reactions} />;
    case "moderateposts":
      return modLevel > 0 ? <ModPostsContainer {...props} reactions={reactions}/> : <PageNotFound />;
    case "moderateusers":
      return modLevel > 0 ? <ModUsersContainer {...props} /> : <PageNotFound />;
    default:
      return <PageNotFound />;
  }
}

export default ContentContainer;
