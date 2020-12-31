import React, { useEffect, useState } from 'react';
import Post from './Post/Post.js';
import 'react-on-screen';

function FeedType(props) {

  const [numPostsLoaded, setNumPostsLoaded] = useState(5);

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
  const [childRefresh, setChildRefresh] = useState(0);
  function childPostRefresh() {
    setChildRefresh(childRefresh + 1);
  }

  const filter = props.filter;
  const sort = props.sort;
  const postRefresh = props.postRefresh;

  useEffect(() => {
    if (filter !== "") {
      props.getPosts(filter, sort, setPosts);
    } else {
      setPosts([]);
    }
  }, [filter, sort, postRefresh, childRefresh]);

  return (
    <div>
      {Object.values(posts).reverse().map((post, i) => {
        if (post.author !== "404" && i < numPostsLoaded)
          return (
            <div key={Object.keys(posts).reverse()[i]}>
              <Post {...props} post={post} postId={Object.keys(posts).reverse()[i]} postNum={i + 1} numPostsLoaded={numPostsLoaded} setNumPostsLoaded={setNumPostsLoaded} childPostRefresh={childPostRefresh} /><br />
            </div>
          )
      })}
    </div>
  );
}

export default FeedType;
