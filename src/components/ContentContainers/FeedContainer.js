import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function FeedContainer(props) {

  const [postRefresh, setPostRefresh] = useState(0);
  const updatePostRefresh = () => {
    setPostRefresh(postRefresh + 1);
  }

  return (
    <div>
      <CreatePostModal firebaseTimeStamp={props.firebaseTimeStamp} currentUserId={props.currentUserId} createPost={props.createPost}
        storeImage={props.storeImage} currentUserInfo={props.currentUserInfo} updatePostRefresh={updatePostRefresh} allGames={props.allGames}
        setAllGames={props.setAllGames}
      />
      <br />
      <FeedType {...props} postRefresh={postRefresh} />
    </div>
  );
}

export default FeedContainer;
