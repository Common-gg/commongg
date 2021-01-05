import React, { useState, useRef, useEffect } from "react";
import Linkify from 'react-linkify';
import { ReactTinyLink } from 'react-tiny-link';
import Text from '../Text.js';
import PostFooter from './PostFooter.js'
import optionsIcon from '../../images/icons/options.png';
import TwitchEmbed from './TwitchEmbed.js'
import { Link, useHistory } from "react-router-dom";
import TrackVisibility from "react-on-screen";


function Post(props) {

  const [author, setAuthor] = useState({ profile: "" });
  const [expand, setExpand] = useState(false);
  const history = useHistory();
  const postImageRef = useRef();

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
    if (props.post.text.length <= 800) {
      setExpand(true);
    }
  }, [props.post]);

  useEffect(() => {
    if (postImageRef.current === undefined)
      return;
  }, [postImageRef])


  function getStyle() {
    if (props.style === undefined) {
      return ({
        borderStyle: 'solid',
        borderRadius: '8px',
        borderColor: '#5F5177',
        borderWidth: '2px',
        paddingBottom: '0px',
        paddingLeft: '20px',
        paddingRight: '20px'
      });
    } else {
      return props.style;
    }
  }

  function deletePost() {
    props.deletePost(props.postId);
    if (props.isPostPage !== true) {
      props.childPostRefresh();
    } else {
      //we deleted and redirect to home
      history.goBack();

    }
  }

  function checkOptions() {
    if (props.currentUserId === props.post.author) {
      return (
        <div>
          <div id="dropdownMenuButton" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "transparent" }}>
            <img src={optionsIcon} alt={"options"} style={{ backgroundColor: "transparent" }} />
          </div>
          <div className="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p className="dropdown-item mb-0" onClick={() => deletePost()} style={{ cursor: "pointer" }}>Delete Post</p>
          </div>
        </div>
      )
    }
  }

  //creating twitch embedding if twitch clips are found
  function checkTwitchClips(link, preview) {
    //parse all twitch clips with regular expression and map the results
    if (typeof link !== "string") return
    const regexp = /https:\/\/www\.twitch\.tv\/[a-zA-Z0-9][\w]{2,24}\/clip\/([a-zA-Z]+)/g;
    const matches = link.matchAll(regexp);
    let clips = [];
    for (const match of matches) {
      clips.push(match[1]);
    }
    if (clips.length === 0) {
      return preview;
    } else {
      return <div><TwitchEmbed clip={clips[0]}></TwitchEmbed></div>
    }
  }

  function handleImageClick() {
    const img = document.getElementById(`${props.postId}img`);
    const natWidth = img.naturalWidth;
    const natHeight = img.naturalHeight;
    props.setModalImage({
      link: postImageRef.current.currentSrc,
      width: natWidth,
      height: natHeight
    });
  }

  const checkType = () => {
    if (props.post.type === "text") {
      return;
    } else if (props.post.type === "image") {
      return (
        <img
          id={props.postId + "img"}
          data-toggle="modal"
          data-target="#enlargedImageModal"
          ref={postImageRef}
          src={props.post.link}
          onClick={handleImageClick}
          alt="posted image"
          style={{
            maxWidth: "100%",
            cursor: "pointer"
          }}>
        </img>
      )
    }
    // Code to turn on video later!
    // else if (props.post.type === "video") {
    //   return (
    //     <video controls name="posted video"
    //       style={{
    //         width: "100%"
    //       }}>
    //       <source
    //         src={props.post.link}
    //       />
    //     </video>
    //   )
    // }
  }

  const expandButtonStyle = {
    height: 32,
    marginLeft: "auto",
    backgroundColor: "transparent",
    color: "#BF9AFC",
    border: "solid",
    borderRadius: "10px",
    borderColor: "#BF9AFC",
    borderWidth: "2px",
  }

  const checkPostNum = isVisible => {
    if (isVisible && props.postNum >= props.numPostsLoaded - 3) {
      props.setNumPostsLoaded(props.numPostsLoaded + 5);
    }
  }

  const checkExpandText = () => {
    if (expand === false) {
      let str = props.post.text.substring(0, 800);
      return (str += "...");
    } else {
      return (props.post.text);
    }
  }

  const checkExpandButton = () => {
    if (props.post.text.length > 800) {
      if (expand === false) {
        return (
          <button onClick={toggleExpand} style={expandButtonStyle}>
            expand
          </button>
        )
      }
    }
  }

  const toggleExpand = () => {
    if (expand === false) {
      setExpand(true);
    } else {
      setExpand(false);
    }
  }

  return (
    <TrackVisibility>
      {({ isVisible }) => {
        checkPostNum(isVisible);
        return (
          <div className="Post" style={getStyle()}>
            <div className="container">
              <br />
              <div className="row">
                <Link to={"/profile/" + props.post.author} className="col-12 row" style={{ textDecoration: 'none' }} >
                  <div className="col-2">
                    <img
                      src={author.profile_picture}
                      alt={author.username + " picture"}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: "50%", cursor: "pointer" }}
                      className="img">
                    </img>
                  </div>
                  <div className="col-10 row" style={{ marginBottom: '5px', lineHeight: '5px', position: "relative", left: "-1rem" }}>
                    <div className="col-12">
                      <br />
                      <br />
                      <Text text={author.username} />
                      <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")}
                        style={{ color: '#BF9AFC', fontSize: '.9rem' }}
                      />
                    </div>
                  </div>
                </Link>
                <div className="ml-auto pr-3 dropdown">
                  {checkOptions()}
                </div>
              </div>
              <Link to={"/post/" + props.postId} style={{ textDecoration: 'none' }}>
                <div className="row">
                  <div className="col-auto" style={{ maxWidth: '100%', paddingRight: '0px' }}>
                    <Text text={props.post.title} style={{ fontSize: '25px' }} />
                  </div>
                  <Link to={"/games/" + props.post.category}>
                    <div className="col-auto" style={{ paddingTop: '.2rem' }}>
                      <Text text={props.post.category}
                        style={{
                          borderStyle: 'solid',
                          borderWidth: '1px',
                          borderRadius: '5px',
                          height: '25px',
                          color: '#BF9AFC',
                          borderColor: '#BF9AFC'
                        }} />
                    </div>
                  </Link>
                </div>
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a target="blank" href={decoratedHref} key={key} style={{ color: "#BF9AFC" }}>
                    <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{decoratedText}</p>
                    {checkTwitchClips(decoratedHref, <ReactTinyLink
                      cardSize="large"
                      showGraphic={true}
                      maxLine={2}
                      minLine={1}
                      url={decoratedHref}
                    />)}
                  </a>
                )}>
                  <p style={{ fontSize: '18px', whiteSpace: "pre-wrap" }}>{checkExpandText()}</p>
                </Linkify>
              </Link>
              {checkExpandButton()}
              {checkType()}
              <PostFooter {...props} />
            </div>
            <br />
          </div>
        )
      }}
    </TrackVisibility>
  );
}

export default Post;
