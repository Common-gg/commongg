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
    if (url.length >= 5) {
      setPageId(url[4]);
    }
    setPageState(url[3]);
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
