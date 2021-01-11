import React, { useEffect, useState } from 'react';
import Post from './Post/Post.js';
import 'react-on-screen';

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
  //used for client filter retrievel
  const [allPosts, setAllPosts] = useState({
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
  const getPosts = props.getPosts;
  const getAllPosts = props.getAllPosts;
  const clientFilter = props.clientFilter;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  useEffect(() => {
    if (props.numPostsLoaded >= props.numPostsToLoad) {
      window.scrollTo(0, props.offSet);
    }
  }, [props.numPostsLoaded])

  //gets the post based on filter
  useEffect(() => {
    //check if we are doing client side filtering
    if (clientFilter === true) {
      //we get all post and filter it on our side based on game and people
      getAllPosts(setAllPosts);
    } else {
      if (filter !== "") {
        getPosts(filter, sort, setPosts);
      } else {
        setPosts([]);
      }
    }
  }, [filter, sort, postRefresh, childRefresh, getPosts, clientFilter, getAllPosts]);

  //when we are done with retrieving allPosts we set the posts by filtering
  useEffect(() => {
    //only changes when we are doing client filtering
    if (clientFilter === true && allPosts) {
      const following = Object.values(props.currentUserInfo.following);
      following.push(props.currentUserId)
      const games = props.currentUserInfo.games
      const filteredPosts = Object.fromEntries(Object.entries(allPosts).filter(
        ([key, value]) => {
          //filter based on value
          const postGame = parseInt(value.game);
          const postAuthor = value.author;
          return (games.includes(postGame) && following.includes(postAuthor))
        }))
      setPosts(filteredPosts);
    }
  }, [allPosts, clientFilter, props.currentUserInfo, props.currentUserId])

  //when the filter changes make the page go back to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [filter])

  function handleScroll() {
    const position = window.pageYOffset;
    props.setOffSet(position);
  }

  return (
    <div>
      {Object.values(posts).reverse().map((post, i) => {
        if (post.author !== "404" && i < props.numPostsToLoad)
          return (
            <div key={Object.keys(posts).reverse()[i]}>
              <Post {...props} post={post} postId={Object.keys(posts).reverse()[i]}
                postNum={i + 1} numPostsToLoad={props.numPostsToLoad} setNumPostsToLoad={props.setNumPostsToLoad} setNumPostsLoaded={props.setNumPostsLoaded}
                childPostRefresh={childPostRefresh} setModalImage={props.setModalImage} setBackClicked={props.setBackClicked}
              />
              <br />
            </div>
          );
      })}
    </div>
  );
}

export default FeedType;
