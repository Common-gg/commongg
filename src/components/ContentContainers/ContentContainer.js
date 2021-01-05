import React, { useEffect, useState } from 'react';
import FeedContainer from './FeedContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';
import GamesContainer from './GamesContainer.js';
import PageNotFound from './PageNotFound.js';
import GameFeedContainer from './GameFeedContainer.js';

function ContentContainer(props) {
  const [pageState, setPageState] = useState("editgames");
  const [pageId, setPageId] = useState();

  useEffect(() => {
    if (props.currentUserInfo.games === undefined || props.currentUserInfo.games === []) {
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
      return <ProfileContainer {...props} pageId={pageId} setProfilePictureImage={props.setProfilePictureImage} />;
    case "post":
      return <ViewPostContainer {...props} pageId={pageId} />;
    case "settings":
      return <SettingsContainer {...props} />;
    case "editgames":
      return <GamesContainer {...props} />;
    case "":
      return <FeedContainer {...props} setModalImage={props.setModalImage} />;
    case "games":
      return <GameFeedContainer {...props} pageId={pageId} />;
    default:
      return <PageNotFound />;
  }
}

export default ContentContainer;
