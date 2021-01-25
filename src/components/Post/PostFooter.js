import React, { useEffect, useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import CreateCommentModal from './CreateCommentModal.js';
import { Link } from "react-router-dom";
import ReactionIcon from '../ReactionIcon';
import commentIcon from '../../images/icons/addcomment.png';
import shareIcon from '../../images/icons/share.png';
import Text from '../Text.js';

function PostFooter(props) {
  const [post, setPost] = useState(props.post)
  const [popoverReactions, setPopoverReactions] = useState([]);
  const [allowClick, setAllowClick] = useState(true);
  const reactions = props.reactions;

  useEffect(() => {
    setPost(props.post);
  }, [props.post])

  useEffect(() => {
    setAllowClick(true);
    if (post.reactions !== undefined) {
      setPopoverReactions(reactions.filter(reaction =>
      (!Object.keys(post.reactions).includes(reaction) ||
        post.reactions[reaction] <= 0)));
    } else {
      setPopoverReactions(reactions);
    }
  }, [post])

  function convertNum(val) {
    let editedVal = val;
    if (editedVal > 1000000000) {
      editedVal = Math.round(val / 100000000) / 10;
      return (editedVal + "b");
    } else if (editedVal > 1000000) {
      editedVal = Math.round(val / 100000) / 10;
      return (editedVal + "m");
    } else if (editedVal > 1000) {
      editedVal = Math.round(val / 100) / 10;
      return (editedVal + "k");
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

  /*
    post footer checks for functionality of comment button
    if comment button is in a page of its own it can create modal
    in all other cases it redirect
  */
  const checkCommentButton = () => {
    //if you are in some feed redirect
    if (props.isPostPage !== true) {
      return (
        <Link to={"/post/comment/" + props.postId} style={{ color: "#BF9AFC" }}>
          <img src={commentIcon} style={{
            backgroundColor: "transparent",
            position: "relative",
            bottom: "-32%",
            height: "auto",
            width: "100%",
            paddingRight: "30%"
          }} />
        </Link>)
    } else {
      //we are in the post page so we create modal
      return (
        <CreateCommentModal {...props} post={post} postId={props.postId} />
      )
    }
  }

  const usersReacted = reaction => {
    if (!post.reacted) return;
    return Object.keys(post.reacted).filter((user, i) => Object.values(post.reacted)[i] === reaction);
  }

  const checkReactions = () => {
    if (post.reactions !== undefined) {
      const sortable = Object.fromEntries(
        Object.entries(post.reactions).sort(([, a], [, b]) => a - b)
      );
      return (
        Object.keys(sortable).reverse().map(reaction => {
          if (post.reactions[reaction] > 0) {
            let reactImg = reaction
            reactions.forEach(r => { 
              if (reaction.toLowerCase() === r.toLowerCase()) reactImg = r;
            });
            return (
              <div style={{ 
                padding: ".8rem", 
                marginRight: "1rem", 
                position: "relative", 
                bottom: "-1rem", 
                left: "-.7rem" 
                }} key={reaction}>
                <ReactionIcon reaction={reactImg} 
                usersReacted={usersReacted(reaction)} 
                reacted={reacted(reaction)} 
                react={react} 
                text={convertNum(post.reactions[reaction])} 
                id={props.postId + reaction} />
              </div>
            )
          }
        })
      )
    }
  }

  const reactionsPopoverStyle = {
    backgroundColor: "#292833",
    boxShadow: "4px 4px 25px 0px #171421 ",
    borderRadius: "20px",
    padding: "10px 0px 10px 10px",
    marginTop: "1%",
  }

  const sharePopoverStyle = {
    backgroundColor: "#292833",
    boxShadow: "4px 4px 25px 0px #171421 ",
    borderRadius: "20px",
    padding: "10px 20px 0px 20px",
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
      props.reactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost, "posts", props.post.author);
      return;
    }
    //reacted would be undefined if not found and some emote if found
    const reacted = post.reacted[props.currentUserInfo.username]
    if (reacted === undefined) {
      //hasn't reacted to post
      props.reactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost, "posts", props.post.author);
      return;
    } else {
      //reacted to post so check if reacted then unreact else switch reaction
      if (reacted !== emote) {
        //if reacted is some other emote we just switch it
        props.changeReaction(props.currentUserInfo.username, props.postId, reacted, emote, 1, setPost, "posts");
      } else {
        //deselect current reaction if reacted to same emote
        props.unreactToPost(props.currentUserInfo.username, props.postId, emote, 1, setPost, "posts");
      }
    }

  }

  const reactionsPopover = (
    <Popover id={props.postId + "popvoer"} style={reactionsPopoverStyle}>
      <Popover.Content>
        <div className="row">
          {popoverReactions.map(reaction => {
            let reactImg = reaction
            reactions.forEach(r => {
              if (reaction.toLowerCase() === r.toLowerCase()) reaction = r;
            });
            return (
              <div style={{ padding: ".8rem", marginRight: ".3vw" }} key={reaction} className="col-2">
                <ReactionIcon reaction={reactImg} react={react} text="" id={props.postId + reaction} />
              </div>
            )
          })}
        </div>
      </Popover.Content>
    </Popover>
  );

  const getPostUrl = () => {
    let url = window.location.origin;
    url += "/post/" + props.postId;
    return url;
  }

  const sharePopover = (
    <Popover id={props.postId + "SharePopover"} style={sharePopoverStyle}>
      <Popover.Content>
        <div className="row">
          <p onClick={() => handleShareClicked()} style={{ color: "#ffffff", cursor: "pointer" }}>Copy Link to Clipboard</p>
        </div>
      </Popover.Content>
    </Popover>
  )

  const handleShareClicked = () => {
    let tempInput = document.createElement("input");
    tempInput.value = getPostUrl();
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    document.body.click();
  }

  return (
    <div className="row justify-content-between" style={{ paddingBottom: "20px" }}>
      <div className="col-8 row justify-content-start" style={{ marginLeft: ".1rem" }}>
        {checkReactions()}
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={reactionsPopover}>
            <div style={{ padding: ".8rem", position: "relative", left: "-1rem", bottom: "-1rem" }}>
              <ReactionIcon react={() => { }} reaction="reactionplus" text="" id={"reaction plus" + props.postId} />
            </div>
        </OverlayTrigger>
      </div>
      <div className="col-4 text-right" style={{ position: 'relative', bottom: '-20px' }}>
        <div className="row justify-content-end" style={{padding: "6%"}}>
          <div style={{ padding: "0px 0px" }}>
            <Text text={convertNum(props.post.numComments)} style={{
              position: "relative",
              bottom: "-35%"
            }} />
          </div>
          <div style={{ padding: "0px 0px 0px 12px" }}>
            {checkCommentButton()}
          </div>
          <div style={{ padding: "0px 0px" }}>
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={sharePopover}>
              <img src={shareIcon} style={{
                backgroundColor: "transparent",
                position: "relative",
                bottom: "-16%",
                width: "100%",
                height: "auto",
                cursor: "pointer"
              }} />
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
