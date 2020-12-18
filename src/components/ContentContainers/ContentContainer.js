import React, { useEffect, useState } from 'react';
import FeedContainer from './FeedContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';
import GamesContainer from './GamesContainer.js';

function ContentContainer(props) {

  const [pageState, setPageState] = useState();

  useEffect(() => {
    let url = window.location.href;
    url = url.split('/');
    setPageState(url[3]);
    console.log(pageState);
  });

  switch (pageState) {
    case "profile":
      return <ProfileContainer {...props} />;
    case "post":
      return <ViewPostContainer {...props} />;
    case "settings":
      return <SettingsContainer {...props} />;
    case "editgames":
      return <GamesContainer {...props} />;
    default:
      return <FeedContainer {...props} />;
  }
}

export default ContentContainer;
