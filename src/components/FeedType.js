import React, { useEffect, useState } from 'react';
import Post from './Post/Post.js';


function FeedType(props) {

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
