import React, { useState, useEffect } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';
import { useLocation } from 'react-router-dom'

function GameFeedContainer(props) {
  const [postRefresh, setPostRefresh] = useState(0);

  const updatePostRefresh = function() {
    setPostRefresh(postRefresh + 1);
  }
  
  return (
    <div>
      <CreatePostModal default={parseInt(props.pageId)} currentUserId={props.currentUserId} createPost={props.createPost} storeImage={props.storeImage} currentUserInfo={props.currentUserInfo} updatePostRefresh={updatePostRefresh} allGames={props.allGames} setAllGames={props.setAllGames}
      />
      <br />
      <FeedType {...props} filter={props.pageId} sort={"game"}/>
    </div>
  );
}

export default GameFeedContainer;
