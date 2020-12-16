import React, { useEffect, useState } from 'react';
import FeedContainer from './FeedContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';

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
      break;
    case "post":
      return <ViewPostContainer {...props} />;
      break;
    case "settings":
      return <SettingsContainer {...props} />;
      break;
    default:
      return <FeedContainer {...props} />;
      break;
  }
}

export default ContentContainer;
