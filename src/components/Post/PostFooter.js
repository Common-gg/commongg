import React, { useEffect } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import IconButton from '../IconButton';
import CreateCommentModal from './CreateCommentModal.js';
import { Link } from "react-router-dom";
import ReactionIcon from '../ReactionIcon';

function PostFooter(props) {
  let reactions = [];

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

  const checkReactions = () => {
    if (props.post.reactions !== undefined) {
      return (
        Object.keys(props.post.reactions).map(reaction => {
          return (
            <div style={{ margin: "10px" }} key={reaction} className="col-3">
              <ReactionIcon reaction={reaction} text={convertNum(props.post.reactions[reaction])} id={props.postId + reaction} />
            </div>
          )
        })
      )
    }
  }

  const checkReactionLines = () => {
    if (props.post.reactions === undefined) return;
    const times = Math.floor(Object.keys(props.post.reactions).length / 3);
    return <div className={`col-${12 * times}`}></div>;
  }

  const popoverStyle = {
    backgroundColor: "#292833",
    color: "whtie",
    boxShadow: "10px"
  }
  const popover = (
    <Popover style={popoverStyle}>
      <Popover.Content>
        <p>A bunch of test</p>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="row" style={{
      paddingBottom: "20px"
    }}>
      <div className="col-8 row">
        {checkReactions()}
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <div style={{ margin: "10px" }} className="col-1">
            <ReactionIcon react={() => { }} reaction="reactionplus" text="" id="reaction plus" />
          </div>
        </OverlayTrigger>
      </div>
      <div className="col-4 row" style={{ position: 'relative', bottom: '-20px' }}>
        {checkReactionLines()}
        <div className="col-3"></div>
        <div>
          <CreateCommentModal {...props} post={props.post} postId={props.postId} showCommentButton={props.showCommentButton} />
        </div>
        <div className="col-6">
          {commentButtonCheck()}
        </div>
        <div>
          <IconButton class="fa fa-share-alt" text="" id={props.postId + "comment"} />
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
