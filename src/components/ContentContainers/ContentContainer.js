import React, { useState } from 'react';
import FeedContainer from './FeedContainer.js';
import ProfileContainer from './ProfileContainer.js';
import ViewPostContainer from './ViewPostContainer.js';
import SettingsContainer from './SettingsContainer.js';

function ContentContainer(props) {

  const [pageState, setPageState] = useState();

  switch (pageState) {     
    case "Profile":
      return <ProfileContainer {...props} />;
      break;
    case "ViewPost":
      return <ViewPostContainer {...props} />;
      break;
    case "":
      return <SettingsContainer {...props} />;
      break;
    default:
      return <FeedContainer {...props} />;
      break;
  }
}

export default ContentContainer;
