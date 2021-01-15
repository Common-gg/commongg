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
      {props.currentUserInfo.following !== undefined ? 
      <FeedType {...props} filter={"CAPTION_TEXT"} sort={"caption"} postRefresh={postRefresh} clientFilter={true}
        setModalImage={props.setModalImage} />
      : null}
    </div>
  );
}

export default FeedContainer;
