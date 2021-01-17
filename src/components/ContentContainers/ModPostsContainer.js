import React from 'react';
import FeedType from '../FeedType.js';

function ModPostsContainer(props) {
  return (
    <FeedType {...props} filter={true} sort="reported"/>
  );
}

export default ModPostsContainer;
