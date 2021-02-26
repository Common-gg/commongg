import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function GameFeedContainer(props) {
  const [postRefresh, setPostRefresh] = useState(0);

  const updatePostRefresh = function () {
    setPostRefresh(postRefresh + 1);
  }

  return (
    <div>
      {props.currentUserInfo ?
        <div>
          <CreatePostModal
            default={parseInt(props.pageId)}
            currentUserId={props.currentUserId}
            createPost={props.createPost}
            storeImage={props.storeImage}
            currentUserInfo={props.currentUserInfo}
            updatePostRefresh={updatePostRefresh}
            allGames={props.allGames}
            setAllGames={props.setAllGames}
            firebaseTimeStamp={props.firebaseTimeStamp}
          />
          <br />
        </div> : null}
      <FeedType {...props} pageId={props.pageId} />
    </div>
  );
}

export default GameFeedContainer;
