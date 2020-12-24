import React, { useState, useEffect } from 'react';
import FeedType from '../FeedType.js';
import { useLocation } from 'react-router-dom'

function GameFeedContainer(props) {

  return (
    <div>
      <p>{props.pageId}</p>
      <FeedType {...props} filter={props.pageId} sort={"game"}/>
    </div>
  );
}

export default GameFeedContainer;
