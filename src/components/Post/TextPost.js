import React, { useState, useEffect } from "react";
import Text from '../Text.js';
import IconButton from '../IconButton.js';
import ProfilePicture from '../ProfilePicture.js';

function TextPost(props) {

  const [author, setAuthor] = useState({ profile: "" });

  useEffect(() => {
    props.getUser(props.post.author, setAuthor)
  }, [])

  function convertNum(val) {
    let editedVal = val;
    if (editedVal > 1000000) {
      editedVal = Math.round(val / 100000) / 10;
      return (editedVal + "M");
    }
    if (editedVal > 1000) {
      editedVal = Math.round(val / 100) / 10;
      return (editedVal + "K");
    } else {
      return editedVal;
    }
  }

  return (
    <div className="TextPost">
      <div className="container">
        <br/>
        <div className="row">
          <div className="col-1">
            <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
          </div>
          <div className="col-11">
            <Text text={author.profile.username} />
            <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US") + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Text text={props.post.title} />
            <Text text={props.post.text} />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <IconButton class="fa fa-smile-o" text={convertNum(props.post.likes)} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-frown-o" text={convertNum(props.post.dislikes)} />
            <p></p>
          </div>
          <div className="col-4">

          </div>
          <div className="col-2">
            <IconButton class="fa fa-comment-o" text={convertNum(props.post.numComments)} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-share-alt" text="" />
          </div>
        </div>
      </div>
    </div >
  );
}

export default TextPost;
