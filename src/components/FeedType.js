import React, { useEffect, useState } from 'react';
import Post from './Post/Post.js';
import 'react-on-screen';
import ReactionsModal from './ReactionsModal.js';

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

  //feedtype toggles both reaction modal state and content by passing callback to post
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [childRefresh, setChildRefresh] = useState(0);
  function childPostRefresh() {
    setChildRefresh(childRefresh + 1);
  }

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

  useEffect(() => {
    props.setLastPostRetrieved(Object.values(posts)[Object.values(posts).length - 1].timestamp);
    if(Object.keys(posts).length < props.numPostsToLoad) return;
    setLoading(false);
  }, [posts])

  useEffect(() => {
    if(props.lastPostRetrieved > 0) getPosts(props.lastPostRetrieved+1, 10, addPosts);
  }, [props.numPostsToLoad])

  //when we are done with retrieving allPosts we set the posts by filtering
  useEffect(() => {
    //only changes when we are doing client filtering
    if (clientFilter === true && allPosts) {
      if (props.currentUserInfo.following === null) {
        return;
      }
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
    props.setLastPostRetrieved(0);
    getPosts(0, props.numPostsToLoad, setPosts);
    window.scrollTo(0, 0)
  }, [props.pageId])

  function addPosts(data) {
    setPosts({...posts, ...data});
  }

  function handleScroll() {
    const position = window.pageYOffset;
    props.setOffSet(position);
  }

  return (
    <div>
      <ReactionsModal getUserWithUsername={props.getUserWithUsername} setShowModal={setShowModal} showModal={showModal} content={modalContent}></ReactionsModal>
      {Object.values(posts).map((post, i) => {
        if (post.author !== "404" && i < props.numPostsToLoad)
          return (
            <div key={Object.keys(posts)[i]}>
              {(post.author === props.game || post.game === props.game || props.game === undefined)? <div><Post {...props} loading={loading} setLoading={setLoading} post={post} postId={post.postId}
                postNum={i + 1} numPostsToLoad={props.numPostsToLoad} setNumPostsToLoad={props.setNumPostsToLoad} setNumPostsLoaded={props.setNumPostsLoaded}
                childPostRefresh={childPostRefresh} setModalImage={props.setModalImage} setBackClicked={props.setBackClicked}
                setShowModal={setShowModal} setModalContent={setModalContent}
              />
                <br /></div> : null}
            </div>
          );
      })}
    </div>
  );
}

export default FeedType;
