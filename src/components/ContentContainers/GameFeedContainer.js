import React, { useState, useEffect } from 'react';
import FeedType from '../FeedType.js';
import { useLocation } from 'react-router-dom'

function GameFeedContainer(props) {
  const [game, setGame] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urls = location.pathname.split('/')
    if (urls.length >= 3) {
      setGame(urls[2])
    }
  }, [location])

  return (
    <div>
      <p>{game}</p>
      <FeedType {...props} filter={game} sort={"game"}/>
    </div>
  );
}

export default GameFeedContainer;
