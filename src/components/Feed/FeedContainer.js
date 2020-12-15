import React, { useEffect, useState } from 'react';
import Input from '../Input.js';
import Post from '../Post/Post.js';
import CreatePostModal from '../Post/CreatePostModal.js';

function FeedContainer(props) {

  const [search, setSearch] = useState();

  return (
    <div>
      <Input type="search" placeholder="search" track={setSearch} />
      <br />
      <CreatePostModal currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
      <br />
      {Object.values(props.posts).map((post, i) => {
        return (
          <div>
            <Post post={post} key={Object.keys(props.posts)[i]} /><br />
          </div>
        )
      })}
    </div>
  );
}

export default FeedContainer;
