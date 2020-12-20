import React, { useState } from 'react';
import FeedType from '../FeedType.js';
import CreatePostModal from '../Post/CreatePostModal.js';
import Input from '../Input.js';

function FeedContainer(props) {

  const [search, setSearch] = useState();

  return (
    <div>
      <Input type="search" placeholder="search" track={setSearch} />
      <br />
      <CreatePostModal currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
      <br />
      <FeedType {...props} filter={"text"} sort={"type"}/>
    </div>
  );
}

export default FeedContainer;
