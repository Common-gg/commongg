import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function FeedContainer(props) {

  return (
    <div>
      <CreatePostModal currentUserId={props.currentUserId} createPost={props.createPost} storeImage={props.storeImage} currentUserInfo={props.currentUserInfo}
      />
      <br />
      <FeedType {...props} filter={"CAPTION_TEXT"} sort={"caption"} />
    </div>
  );
}

export default FeedContainer;
