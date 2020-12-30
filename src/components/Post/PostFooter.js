import React, { useEffect, useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import IconButton from '../IconButton';
import CreateCommentModal from './CreateCommentModal.js';
import { Link } from "react-router-dom";
import ReactionIcon from '../ReactionIcon';
import commentIcon from '../../images/icons/comment.png';
import shareIcon from '../../images/icons/share.png';
import Text from '../Text.js';

function PostFooter(props) {
  const [post, setPost] = useState(props.post)
  const [popoverReactions, setPopoverReactions] = useState([]);
  const [allowClick, setAllowClick] = useState(true);
  const reactions = [
    "kekw",
    "mad",
    "monkaS",
    "omegalul",
    "peepohappy",
    "peepolove",
    "pepelaugh",
    "pog",
    "sadge",
    "soulessFF",
    "soulessOhno",
    "thumbsup",
    "influrUWU"
  ];

  useEffect(() => {
    setAllowClick(true);
    if (post.reactions !== undefined) {
      setPopoverReactions(reactions.filter(reaction => 
        (!Object.keys(post.reactions).includes(reaction) ||
        post.reactions[reaction]  <= 0)));
    } else {
      setPopoverReactions(reactions);
    }
  }, [post])

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

  //check if current user reacted to post
  function reacted(reaction) {
    //not found in reated means it didn't react to emote
    if (post.reacted === undefined || post.reacted[props.currentUserInfo.username] === undefined) {
      return false;
    } else {
      //reacted if current is same as reacted emote
      return (post.reacted[props.currentUserInfo.username] === reaction);
    }
  }

  const commentButtonCheck = () => {
    if (props.postId !== undefined) {
      return (
        <Link to={"/post/" + props.postId} style={{ color: "#BF9AFC" }}>
          <img src={commentIcon} style={{
            backgroundColor: "transparent",
            position: "relative",
            bottom: "-12px"
          }} />
        </Link>)
    } else {
      return (
        <CreateCommentModal {...props} post={post} postId={props.postId} showCommentButton={props.showCommentButton} />
      )
    }
  }

  const checkReactions = () => {
    if (post.reactions !== undefined) {
      return (
        Object.keys(post.reactions).map(reaction => {
          if (post.reactions[reaction] > 0) {
            return (
              <div style={{ padding: "10px", bottom: "-20px", left: "-10px", }} key={reaction} className="col-4">
                <ReactionIcon reaction={reaction} reacted={reacted(reaction)} react={react} text={post.reactions[reaction]} id={props.postId + reaction} />
              </div>
            )
          }
        })
      )
    }
  }

  const checkReactionLines = () => {
    if (post.reactions === undefined) return;
    const times = Math.floor(Object.keys(post.reactions).length / 3);
    return <div className={`col-${12 * times}`}></div>;
  }

  const popoverStyle = {
    backgroundColor: "#292833",
    boxShadow: "4px 4px 200px 0px #171421 ",
    borderRadius: "20px",
    padding: "10px 0px 10px 20px",
    marginTop: "20px"
  }

  const react = emote => {
    if (!allowClick) {
      return;
    }
    setAllowClick(false);
    //first check if anyone has reacted
    if (post.reacted === undefined) {
      //hasn't reacted to post
      props.reactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost);
      return;
    }
    //reacted would be undefined if not found and some emote if found
    const reacted = post.reacted[props.currentUserInfo.username]
    if (reacted === undefined) {
      //hasn't reacted to post
      props.reactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost);
      return;
    } else {
      //reacted to post so check if reacted then unreact else switch reaction
      if (reacted !== emote) {
        //if reacted is some other emote we just switch it
        props.changeReaction(props.currentUserInfo.username, props.postId, reacted, emote, 1, setPost);
      } else {
        //deselect current reaction if reacted to same emote
        props.unreactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost);
      }
    }
    
  }

  const popover = (
    <Popover id={props.postId + "popvoer"} style={popoverStyle}>
      <Popover.Content>
        <div className="row">
          {popoverReactions.map(reaction => {
            return (
              <div style={{ padding: "5px", }} key={reaction} className="col-3">
                <ReactionIcon reaction={reaction} react={react} text="" id={props.postId + reaction} />
              </div>
            )
          })}
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="row" style={{
      paddingBottom: "20px"
    }}>
      <div className="col-8 row">
        {checkReactions()}
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
          <div>
            <div style={{ padding: "10px", bottom: "-20px", }} className="col-1">
              <ReactionIcon react={() => { }} reaction="reactionplus" text="" id={"reaction plus" + props.postId} />
            </div>
          </div>
        </OverlayTrigger>
      </div>
      <div className="col-4 row" style={{ position: 'relative', bottom: '-20px'}}>
        {checkReactionLines()}
        <div className="col-2" />
        <div className="col-2">
          <Text text={convertNum(props.post.numComments)} style={{
            position: "relative",
            bottom: "-12px"
          }} />
        </div>
        <div className="col-2">
          {commentButtonCheck()}
        </div>
        <div className="col-2">
          <img src={shareIcon} style={{
            backgroundColor: "transparent",
            position: "relative",
            bottom: "-8px",
            left: "10px"
          }} />
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
