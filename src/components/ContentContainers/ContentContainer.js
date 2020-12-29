import React, { useEffect, useState } from 'react';
import FeedContainer from './FeedContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';
import GamesContainer from './GamesContainer.js';
import PageNotFound from './PageNotFound.js';
import GameFeedContainer from './GameFeedContainer.js'

function ContentContainer(props) {
  const [pageState, setPageState] = useState();
  const [pageId, setPageId] = useState();
  useEffect(() => {
    let url = window.location.href;
    url = url.split('/');
    setPageState(url[3]);
    if (url.length >= 5) {
      //if page state is games check the id
      if (url[3] === "games"){
        //find current title's id which is its index in the array
        console.log(url[4])
        const curGameId = props.allGames.findIndex((game) => {
          console.log(game.title.split(" ").join('').toLowerCase());
          return game.title.split(" ").join('').toLowerCase() === url[4];
        });
        //game id is the index
        setPageId(curGameId.toString());
        console.log("the game index is: " + curGameId);
      } else {
        setPageId(url[4]);
      }
    }
    
    
  });

  switch (pageState) {
    case "profile":
      return <ProfileContainer {...props} pageId={pageId} />;
    case "post":
      return <ViewPostContainer {...props} />;
    case "settings":
      return <SettingsContainer {...props} />;
    case "editgames":
      return <GamesContainer {...props} />;
    case "":
      return <FeedContainer {...props} />;
    case "games":
      return <GameFeedContainer {...props} pageId={pageId} />;
    default: 
      return <PageNotFound />;
  }
}

export default ContentContainer;
