import React from 'react';
import FeedType from '../FeedType.js';

function ModPostsContainer(props) {
  return (
    <FeedType {...props} clientFilter="reported"/>
  );
}

export default ModPostsContainer;
