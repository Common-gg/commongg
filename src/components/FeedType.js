import React, { useEffect, useState } from 'react';
import Input from './Input.js';
import Post from './Post/Post.js';
import CreatePostModal from './Post/CreatePostModal.js';

function FeedType(props) {

  const [search, setSearch] = useState();

  const [posts, setPosts] = useState({
    "00000000": {
      author: "404",
      caption: "Nothing here",
      game: "",
      link: "",
      text: "There are no posts to see",
      timestamp: 0,
      title: "No Content",
      type: "text"
    }
  });

  useEffect(() => {
    props.getPosts(props.filter, props.sort, setPosts);
  }, []);

  return (
    <div>
      <Input type="search" placeholder="search" track={setSearch} />
      <br />
      <CreatePostModal currentUserId={props.currentUserId} setCreatePost={props.setCreatePost} storeImage={props.storeImage} />
      <br />
      {Object.values(posts).reverse().map((post, i) => {
        return (
          <div key={Object.keys(posts).reverse()[i]}>
            <Post post={post} postId={Object.keys(posts).reverse()[i]} getUser={props.getUser}/><br />
          </div>
        )
      })}
    </div>
  );
}

export default FeedType;
