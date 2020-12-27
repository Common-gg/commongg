import React, { useState, useEffect } from "react";
import Text from '../Text.js';
import IconButton from '../IconButton.js';
import ProfilePicture from '../ProfilePicture.js';
import { Link } from "react-router-dom";
import CreateCommentModal from './CreateCommentModal.js';

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

  const checkType = () => {

    if (props.post.type === "text") {
      return
    } else if (props.post.type === "image") {
      return (
        <img
          src={props.post.link}
          alt="posted image"
          style={{
            width: "100%"
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

  const commentButtonCheck = () => {
    if (props.postId !== undefined) {
      return (
        <Link to={"/post/" + props.postId} style={{ color: "#BF9AFC" }}>
          <IconButton class="fa fa-comment-o" text={convertNum(props.post.numComments)} />
        </Link>)
    } else {
      return (
        <IconButton class="fa fa-comment-o" text={convertNum(props.post.numComments)} />
      )
    }
  }

  const showCategory = () => {
    if (props.showCategory !== undefined) {
      return (
        <div class="p-2">
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
      );
    }
  }

  return (
    <div className="Post" style={getStyle()}>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-8 row">
            <div className="col-1">
              <ProfilePicture currentUserInfo={author} width="40px" height="40px" />
            </div>
            <div className="col-11 row" style={{ marginBottom: '5px', lineHeight: '4px' }}>
              <div className="col-1"></div>
              <div className="col-10">
                <br />
                <br />
                <Text text={author.username} />
                <Text text={new Date(props.post.timestamp).toLocaleTimeString("en-US") + " - " + new Date(props.post.timestamp).toLocaleDateString("en-US")}
                  style={{ color: '#BF9AFC', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div class="d-flex align-items-center flex-wrap">
              <div class="p-2"><Text text={props.post.title} style={{ fontSize: '32px' }} /></div>
              {showCategory()}
            </div>
            <Text text={props.post.text} style={{ fontSize: '18px' }} />
            {checkType()}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <IconButton class="fa fa-smile-o" text={convertNum(props.post.likes)} />
          </div>
          <div className="col-2">
            <IconButton class="fa fa-frown-o" text={convertNum(props.post.dislikes)} />
          </div>
          <div className="col-2">

          </div>
          <div className="col-2">
            <CreateCommentModal {...props} post={props.post} postId={props.postId} showCommentButton={props.showCommentButton} />
          </div>
          <div className="col-2">
            {commentButtonCheck()}
          </div>
          <div className="col-2">
            <IconButton class="fa fa-share-alt" text="" />
          </div>
        </div>
      </div>
      <br />
    </div >
  );
}

export default Post;
