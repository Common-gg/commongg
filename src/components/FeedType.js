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
    if (Object.keys(posts).length < props.numPostsToLoad) return;
    props.setLastPostRetrieved(Object.values(posts)[Object.values(posts).length - 1].timestamp);
    setLoading(false);
  }, [posts])

  useEffect(() => {
    if (props.clientFilter) {

    } else {
      if (props.lastPostRetrieved > 0) props.getPosts(props.lastPostRetrieved, 10, addPosts);
    }
  }, [props.numPostsToLoad])

  //when the filter changes make the page go back to top
  useEffect(() => {
    if (props.clientFilter) {

      let filter;

      switch (props.clientFilter) {
        case "profile":
          filter = "author";
          break;
        case props.pageId:
          filter = "game";
        default:
          return;
      }

      props.getFilteredPosts(filter, props.pageId, setPosts);
    } else {
      props.setLastPostRetrieved(0);
      props.getPosts(0, props.numPostsToLoad, setPosts);
      window.scrollTo(0, 0)
    }
  }, [props.pageId])

  function addPosts(data) {
    setPosts({ ...posts, ...data });
  }

  function handleScroll() {
    const position = window.pageYOffset;
    props.setOffSet(position);
  }

  return (
    <div>
      <ReactionsModal getUserWithUsername={props.getUserWithUsername} setShowModal={setShowModal} showModal={showModal} content={modalContent}></ReactionsModal>
      {(props.clientFilter ? Object.values(posts).reverse() : Object.values(posts)).map((post, i) => {
        if (post.author !== "404" && i < props.numPostsToLoad)
          return (
            <div key={Object.keys(posts)[i]}>
              {(post.author === props.pageId || post.game === props.pageId || props.pageId === undefined) ? <div><Post {...props} loading={loading} setLoading={setLoading} post={post} postId={post.postId}
                postNum={i + 1} numPostsToLoad={props.numPostsToLoad} setNumPostsToLoad={props.setNumPostsToLoad} setNumPostsLoaded={props.setNumPostsLoaded}
                childPostRefresh={childPostRefresh} setModalImage={props.setModalImage} setBackClicked={props.setBackClicked}
                setShowModal={setShowModal} setModalContent={setModalContent} reactions={props.reactions}
              />
                <br /></div> : null}
            </div>
          );
        return null;
      })}
    </div>
  );
}

export default FeedType;
