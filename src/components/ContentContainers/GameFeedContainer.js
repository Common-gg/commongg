import React, { useState, useEffect } from 'react';
import FeedType from '../FeedType.js';
import { useLocation } from 'react-router-dom'

function GameFeedContainer(props) {
  const [gameId, setGameId] = useState("-1");
  
  return (
    <div>
      {gameId==="-1"?null:<p>{props.allGames[gameId]}</p>}
      <FeedType {...props} filter={props.pageId} sort={"game"}/>
    </div>
  );
}

export default GameFeedContainer;
