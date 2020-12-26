import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function FeedContainer(props) {

  const [postRefresh, setPostRefresh] = useState(0);
  const updatePostRefresh = function() {
    setPostRefresh(postRefresh + 1);
  }
  
  return (
    <div>
      <CreatePostModal currentUserId={props.currentUserId} createPost={props.createPost} storeImage={props.storeImage} currentUserInfo={props.currentUserInfo} updatePostRefresh={updatePostRefresh}
      />
      <br />
      <FeedType {...props} filter={"CAPTION_TEXT"} sort={"caption"} postRefresh={postRefresh}/>
    </div>
  );
}

export default FeedContainer;
