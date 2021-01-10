import React, { useState, useRef, useEffect } from "react";
import Linkify from 'react-linkify';
import { ReactTinyLink } from 'react-tiny-link';
import Text from '../Text.js';
import PostFooter from './PostFooter.js';
import optionsIcon from '../../images/icons/options.png';
import TwitchClipEmbed from './TwitchClipEmbed.js';
import TwitchStreamEmbed from './TwitchStreamEmbed.js';
import YoutubeEmbed from './YoutubeEmbed.js';
import { Link, useHistory } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import ArrowLeft from "../../images/icons/arrowleft 1.png";


function Post(props) {

  const [author, setAuthor] = useState({ profile: "" });
  const [expand, setExpand] = useState(false);
  const [renderBackButton, setRenderBackButton] = useState(false);
  const history = useHistory();
  const postImageRef = useRef();

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
    if (props.post.text.length <= 500) {
      setExpand(true);
    }
  }, [props.post]);

  useEffect(() => {
    if (postImageRef.current === undefined)
      return;
  }, [postImageRef])

  useEffect(() => {
    props.setNumPostsLoaded(props.postNum);
    if (props.isBackButtonVisible === true) {
      setRenderBackButton(true);
    }
  }, [])

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

  function checkEmbeded(link, preview) {
    if (typeof link !== "string") return

    //twitch clip
    let regexp = /(?:twitch\.tv\/[a-zA-Z0-9][\w]{2,24}\/clip\/([a-zA-Z]+))|(?:clips\.twitch\.tv\/([a-zA-Z]+))/g;
    let matches = link.matchAll(regexp);
    let clip = [];
    for (const match of matches) {
      if (match[1] !== undefined) {
        clip.push(match[1]);
      } else if (match[2] !== undefined) {
        clip.push(match[2]);
      }
    }
    if (clip.length !== 0) {
      return <div><TwitchClipEmbed clip={clip[0]}></TwitchClipEmbed></div>
    }

    //twitch stream
    regexp = /twitch\.tv\/([a-zA-Z0-9_]{4,25})/g;
    matches = link.matchAll(regexp);
    let channel = [];
    for (const match of matches) {
      if (match[1] !== undefined) {
        channel.push(match[1]);
      }
    }
    if (channel.length !== 0) {
      return <div><TwitchStreamEmbed channel={channel[0]} ></TwitchStreamEmbed></div>
    }

    //youtube video
    regexp = /(?:youtube\.com\/watch\?v=([1-9a-zA-Z-_]{11}))|(?:youtu\.be\/([1-9a-zA-Z-_]{11}))|(?:youtube\.com\/embed\/([1-9a-zA-Z-_]{11}))/g;
    matches = link.matchAll(regexp);
    let video = [];
    for (const match of matches) {
      if (match[1] !== undefined) {
        video.push(match[1]);
      } else if (match[2] !== undefined) {
        video.push(match[2]);
      } else if (match[3] !== undefined) {
        video.push(match[3]);
      }
    }
    if (video.length !== 0) {
      return <div><YoutubeEmbed video={video[0]}></YoutubeEmbed></div>
    }
    return preview;
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
    cursor: "pointer"
  }

  const imageBackButtonStyle = {
    width: "35px",
    height: "35px"
  };

  const backButtonStyle = {
    backgroundColor: "transparent",
    color: "#BF9AFC",
    borderWidth: "2px",
    padding: "0.6rem"
  };

  const checkPostNum = isVisible => {
    if (isVisible && props.postNum >= props.numPostsToLoad - 3) {
      props.setNumPostsToLoad(props.numPostsToLoad + 5);
    }
  }

  const checkExpandText = () => {
    if (expand === false) {
      let str = props.post.text.substring(0, 500);
      return (str += "...");
    } else {
      return (props.post.text);
    }
  }

  const checkExpandButton = () => {
    if (props.post.text.length > 500) {
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

  function handleBackClick() {
    props.setBackClicked(true);
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

                <div className="col-12 row" >
                  {renderBackButton ? <button type="button"
                    className="btn"
                    style={backButtonStyle}
                    onClick={handleBackClick}
                  >
                    <img src={ArrowLeft} style={imageBackButtonStyle} />
                  </button> : null}
                  <Link to={"/profile/" + props.post.author} className="col-10 row" style={{ marginBottom: '5px', lineHeight: '5px', position: "relative", bottom: "-0.5rem", left: "0.5rem", textDecoration: 'none' }}>
                    <img
                      src={author.profile_picture}
                      alt={author.username + " picture"}
                      width="40px"
                      height="40px"
                      style={{ borderRadius: "50%", cursor: "pointer" }}
                      className="img">
                    </img>
                    <div className="col-8">
                      <Text text={author.username} />
                      <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")}
                        style={{ color: '#BF9AFC', fontSize: '.9rem', }}
                      />
                    </div>
                  </Link>
                </div>
                <div className="ml-auto pr-3 dropdown">
                  {checkOptions()}
                </div>
              </div>

              <div className="row">
                <Link to={"/post/" + props.postId} style={{ textDecoration: 'none' }}>
                  <div className="col-auto" style={{ maxWidth: '100%', paddingRight: '0px' }}>
                    <Text text={props.post.title} style={{ fontSize: '25px' }} />
                  </div>
                </Link>
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
                  {checkEmbeded(decoratedHref, <ReactTinyLink
                    cardSize="large"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={decoratedHref}
                  />)}
                </a>
              )}>
                <Link to={"/post/" + props.postId} style={{ textDecoration: 'none' }}>
                  <p style={{ fontSize: '18px', whiteSpace: "pre-wrap", maxWidth: "35rem", wordWrap: "break-word" }}>{checkExpandText()}</p>
                </Link>
              </Linkify>
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
