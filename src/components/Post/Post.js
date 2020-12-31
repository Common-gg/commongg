import React, { useState, useEffect } from "react";
import Linkify from 'react-linkify';
import Text from '../Text.js';
import PostFooter from './PostFooter.js'
import ProfilePicture from '../ProfilePicture.js';
import optionsIcon from '../../images/icons/options.png';
import { Link } from "react-router-dom";
import TrackVisibility from "react-on-screen";

function Post(props) {

  const [author, setAuthor] = useState({ profile: "" });

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
  }, [props.post]);

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
    props.childPostRefresh();
  }

  function checkOptions() {
    if (props.currentUserId === props.post.author) {
      return (
        <div>
          <div id="dropdownMenuButton" className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "transparent" }}>
            <img src={optionsIcon} alt={"options"} style={{ backgroundColor: "transparent" }} />
          </div>
          <div class="dropdown-menu-right dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p className="dropdown-item mb-0" onClick={() => deletePost()} style={{ cursor: "pointer" }}>Delete Post</p>
          </div>
        </div>
      )
    }
  }

  const checkType = () => {

    if (props.post.type === "text") {
      return
    } else if (props.post.type === "image") {
      return (
        <img
          src={props.post.link}
          alt="posted image"
          style={{
            maxWidth: "100%"
          }}
        />
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

  const checkPostNum = isVisible => {
    if(isVisible && props.postNum >= props.numPostsLoaded - 3) {
      props.setNumPostsLoaded(props.numPostsLoaded + 5);
    }
  }

  return (
    <TrackVisibility once>
      {({ isVisible }) => {
        checkPostNum(isVisible);
        return (
        <div className="Post" style={getStyle()}>
          <div className="container">
            <br />
            <div className="row">
              <div className="col-12 row">
                <div className="col-2">
                  <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
                </div>
                <div className="col-10 row" style={{ marginBottom: '5px', lineHeight: '5px', position: "relative", left: "-1rem" }}>
                  <div className="col-12">
                    <br />
                    <br />
                    <Link to={"/profile/" + props.post.author} style={{ textDecoration: 'none' }} >
                      <Text text={author.username} />
                    </Link>
                    <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }) + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")}
                      style={{ color: '#BF9AFC', fontSize: '.9rem' }}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-auto pr-3 dropdown">
                {checkOptions()}
              </div>
            </div>
            <div className="row">
              <div className="col-auto" style={{ maxWidth: '100%', paddingRight: '0px' }}>
                <Link to={"/post/" + props.postId} style={{ textDecoration: 'none' }}>
                  <Text text={props.post.title} style={{ fontSize: '25px' }} />
                </Link>
              </div>
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
            </div>
            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                <p style={{ overflowWrap: 'break-word' }}>{decoratedText}</p>
              </a>
            )}>
              <p style={{ fontSize: '18px' }}>{props.post.text}</p>
            </Linkify>
            {checkType()}
            <PostFooter {...props} />
          </div>
          <br />
        </div >
        )
      }}
    </TrackVisibility>
  );
}

export default Post;
