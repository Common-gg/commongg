import React, { useState, useRef, useEffect } from "react";
import Linkify from 'react-linkify';
import Imgix from 'react-imgix';
import Text from '../Text.js';
import PostFooter from './PostFooter.js';
import optionsIcon from '../../images/icons/options.png';
import TwitchClipEmbed from './TwitchClipEmbed.js';
import TwitchStreamEmbed from './TwitchStreamEmbed.js';
import YoutubeEmbed from './YoutubeEmbed.js';
import { Link, useHistory } from "react-router-dom";
import TrackVisibility from "react-on-screen";
import ArrowLeft from "../../images/icons/arrowleft 1.png";
import check from "../../images/icons/followingcheck-1.png";
import loading from '../../images/icons/loading.svg';
import ProfilePicture from "../ProfilePicture.js";
import * as Icon from 'react-bootstrap-icons';
import CreatePostModal from './CreatePostModal.js';

function Post(props) {

  const [author, setAuthor] = useState({ profile: "" });
  const [expand, setExpand] = useState(false);
  const [renderBackButton, setRenderBackButton] = useState(false);
  const history = useHistory();
  const postImageRef = useRef();
  const linkRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  const twitchClipRegexp = /(?:twitch\.tv\/[a-zA-Z0-9][\w]{2,24}\/clip\/([a-zA-Z0-9-_]+))|(?:clips\.twitch\.tv\/([a-zA-Z0-9-_]+))/g;
  const twitchStreamRegexp = /twitch\.tv\/([a-zA-Z0-9_]{4,25})/g;
  const youtubeRegexp = /(?:youtube\.com\/watch\?v=([0-9a-zA-Z-_]{11}))|(?:youtu\.be\/([0-9a-zA-Z-_]{11}))|(?:youtube\.com\/embed\/([0-9a-zA-Z-_]{11}))/g;
  const imageRegexp = /\.((jpe?g)|(JPE?G)|(png)|(PNG)|(gif)|(gifv))/g;
  const videoRegexp = /\.((mp4)|(MP4))/g;

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
    if (props.post.text !== undefined) {
      if (props.post.text.length <= 500) {
        setExpand(true);
      }
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
      history.goBack.pageYOffset = historyScrollPosition;
      history.goBack();
    }
  }

  const historyScrollPosition = () => {
    return window.pageYOffset;
  }

  //create maping of emote with a list of the users who reacted
  function reactionMap() {
    let map = new Map();
    const reacted = props.post.reacted;
    if (reacted) {
      for (const user in reacted) {
        const reaction = reacted[user];
        if (map.has(reaction)) {
          map.get(reaction).push(user);
        } else {
          map.set(reaction, [user])
        }
      }
    }
    return map
  }

  function handleShowReactions() {
    //show the modal and then set the current reactions
    props.setShowReactionsModal(true);
    //calculate the reaction mapping and set it to modal content
    props.setReactionsModalContent(reactionMap());
  }

  function checkOptions() {
    let modLvl;
    if (!props.currentUserInfo || !props.currentUserInfo.moderationLevel) {
      modLvl = 0;
    } else {
      modLvl = props.currentUserInfo.moderationLevel;
    }
    return (
      <div>
        <div id="dropdownMenuButton"
          className="btn"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ background: "transparent" }}>
          <img src={optionsIcon}
            alt={"options"}
            style={{
              backgroundColor: "transparent",
              marginTop: "-5.8rem",
              marginRight: "-1rem"
            }} />
        </div>
        <div className="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton"
          style={{
            backgroundColor: "#BF9AFC",
            marginTop: "-3rem",
            marginRight: "-1rem"
          }}>
          {props.currentUserId === props.post.author || modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => deletePost()} style={{ cursor: "pointer" }}>Delete Post</p> : null}
          {props.currentUserId === props.post.author ? <CreatePostModal {...props} postId={props.postId} /> : null}
          <p className="dropdown-item mb-0" onClick={() => handleShowReactions()} style={{ cursor: "pointer" }}>Reactions</p>
          {(props.currentUserId && props.currentUserId !== props.post.author) ? <p className="dropdown-item mb-0" onClick={() => props.report("content/posts", props.postId)} style={{ cursor: "pointer" }}>Report Post</p> : null}
          {modLvl > 0 ? <p className="dropdown-item mb-0" onClick={() => props.clearReports("content/posts", props.postId)} style={{ cursor: "pointer" }}>Clear Reports (Current: {props.post.reports ? props.post.reports : 0})</p> : null}
        </div>
      </div>
    )
  }

  function checkEmbeded(link, text) {
    if (typeof link !== "string") return;

    //twitch clip
    let matches = link.matchAll(twitchClipRegexp);
    let clip = [];
    for (const match of matches) {
      if (match[1] !== undefined) {
        clip.push(match[1]);
      } else if (match[2] !== undefined) {
        clip.push(match[2]);
      }
    }
    if (clip.length !== 0) {
      return (<div>{text}<TwitchClipEmbed clip={clip[0]}></TwitchClipEmbed></div>)
    }

    //twitch stream
    matches = link.matchAll(twitchStreamRegexp);
    let channel = [];
    for (const match of matches) {
      if (match[1] !== undefined) {
        channel.push(match[1]);
      }
    }
    if (channel.length !== 0) {
      return <div>{text}<TwitchStreamEmbed channel={channel[0]} ></TwitchStreamEmbed></div>
    }

    //youtube video
    matches = link.matchAll(youtubeRegexp);
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
      return <div>{text}<YoutubeEmbed video={video[0]}></YoutubeEmbed></div>
    }

    // image file
    if (link.search(imageRegexp) !== -1) {
      return (
        <img
          id={link + "img"}
          src={link}
          alt={link}
          data-toggle="modal"
          data-target="#enlargedImageModal"
          onClick={() => handleEmbeddedImageClick(link)}
          style={{
            maxWidth: "100%"
          }}>
        </img>
      );
    }

    // video file
    if (link.search(videoRegexp) !== -1) {
      return (
        <video controls style={{ width: "100%", height: "300px" }}>
          <source src={link} type="video/mp4" />
        </video>
      )
    }

    // basic link
    return (
      <p style={{ display: "inline" }}>
        {text}
      </p>
    )
  }

  const checkType = () => {
    if (props.post.type === "text") {
      return;
    } else if (props.post.type === "image") {
      let link = props.post.link;
      if (props.post.link.includes('firebasestorage')) {
        const start = link.indexOf('%2F') + 3;
        const end = link.indexOf('?alt');
        link = `https://${process.env.REACT_APP_imgixURL}/postImage/${(link.substring(start, end))}`;
      }
      return (
        <div>
          <Imgix
            src={link + '?fit=max&auto=format,compress&q=75'}
            sizes='
              (max-width: 375px) 113px,
              (max-width: 414px) 125px,
              (max-width: 601px) 181px,
              (max-width: 768px) 231px,
              (max-width: 1024px) 307px,
              (max-width: 1280px) 384px,
              (max-width: 1440px) 430px,
              (max-width: 1600px) 480px,
              (max-width: 1920px) 561px,
              768px'
            htmlAttributes={{
              id: props.postId + "img",
              alt: "posted image",
              "data-toggle": "modal",
              "data-target": "#enlargedImageModal",
              onClick: () => handleImageClick(link),
              style: {
                maxWidth: "100%",
                cursor: "pointer",
                marginBottom: "1.5rem"
              }
            }} />
        </div>
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

  function handleImageClick(link) {
    props.setModalImage({
      link: link + '?fit=max&auto=format'
    });
  }

  function handleEmbeddedImageClick(imageLink) {
    const img = document.getElementById(`${imageLink}img`);
    const natWidth = img.naturalWidth;
    const natHeight = img.naturalHeight;
    props.setModalImage({
      link: imageLink,
      width: natWidth,
      height: natHeight
    })
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
    if (isVisible && !props.loading && props.postNum >= props.numPostsLoaded - 7) {
      props.setLoading(true);
      props.setNumPostsToLoad(props.numPostsToLoad + 10);
    }
  }

  const checkExpandText = () => {
    if (expand === false) {
      if (props.post.text !== undefined) {
        let str = props.post.text.substring(0, 500);
        let match;
        while ((match = linkRegex.exec(props.post.text)) != null) {
          if (match.index <= 500 && (match.index + match[0].length) > 500) {
            str += props.post.text.substring(500, match.index + match[0].length);
          }
        }
        return (str += "...");
      }
    } else {
      return (props.post.text);
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
              <div className="row" style={{ marginBottom: "-5%" }}>
                <div className="col-12 row" >
                  {renderBackButton ? <button type="button"
                    className="btn"
                    style={backButtonStyle}
                    onClick={handleBackClick}
                  >
                    <Icon.ArrowLeft style={imageBackButtonStyle} />
                  </button> : null}
                  <Link to={"/profile/" + author.username} className="col-10 row"
                    style={{
                      marginBottom: '5px',
                      lineHeight: '5px',
                      position: "relative",
                      bottom: "-0.5rem",
                      left: "0.5rem",
                      textDecoration: 'none'
                    }}>
                    <ProfilePicture user={{ ...author, id: props.post.author }} width={40} height={40} />
                    <div className="col-8">
                      <span className="row" style={{ marginLeft: 0 }}>
                        <Text text={author.username} />
                        {author.verified ? <img src={check} alt={author.username + "verified"}
                          style={{
                            width: "1.1rem",
                            height: "1.1rem",
                            marginTop: "-3%",
                            marginLeft: "2%"
                          }} />
                          : null}
                      </span>
                      <Text text={new Date(props.convertTimeStamp(props.post.timestamp)).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.convertTimeStamp(props.post.timestamp)).toLocaleDateString("en-US") + (props.post.timeEdited ? " (edited)" : "")}
                        style={{ color: '#BF9AFC', fontSize: '.9rem', whiteSpace: "nowrap" }}
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
                  <div className="col-auto" style={{
                    maxWidth: '100%',
                    paddingRight: '0px',
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                  }}>
                    <Text text={props.post.title} style={{
                      fontSize: '25px',
                      maxWidth: "100%",
                      width: "100%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      hyphens: "auto",
                      wordBreak: "break-word",
                    }} />
                  </div>
                </Link>
                <Link to={"/games/" + (props.post.category !== undefined ? props.post.category.toLowerCase().split(" ").join("") : null)}>
                  <div className="col-auto" style={{ paddingTop: '.2rem' }}>
                    <Text text={props.post.category}
                      style={{
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderRadius: '5px',
                        padding: "5px",
                        marginBottom: "10px",
                        height: '32px',
                        color: '#BF9AFC',
                        borderColor: '#BF9AFC',
                        whiteSpace: "nowrap"
                      }} />
                  </div>
                </Link>
              </div>
              <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="blank"
                  href={decoratedHref}
                  key={key}
                  style={{ color: "#BF9AFC" }}>
                  {checkEmbeded(decoratedHref, <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: "inherit" }}>{decoratedText}</p>, null)}
                </a>
              )}>
                {/*<Link to={"/post/" + props.postId} style={{ textDecoration: 'none' }}>
                  <p style={{ fontSize: '18px', whiteSpace: "pre-wrap", maxWidth: "35rem", wordWrap: "break-word" }}>{checkExpandText()}</p>
              </Link>*/}
                <p style={{
                  fontSize: '18px',
                  whiteSpace: "pre-wrap",
                  maxWidth: "35rem",
                  wordWrap: "break-word"
                }}>
                  {checkExpandText()}</p>
              </Linkify>
              {checkType()}
              {props.pageState === undefined ? (<Link to={"/post/" + props.postId}>
                <button onClick={historyScrollPosition} style={expandButtonStyle}>
                  View Post
                </button>
              </Link>) : null}
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