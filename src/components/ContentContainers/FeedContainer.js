import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function FeedContainer(props) {

  return (
    <div>
      <CreatePostModal currentUserId={props.currentUserId} createPost={props.createPost} storeImage={props.storeImage} />
      <br />
      <FeedType {...props} filter={"text"} sort={"type"}/>
    </div>
  );
}

export default FeedContainer;
