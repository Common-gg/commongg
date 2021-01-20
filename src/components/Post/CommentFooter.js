import React, { useEffect, useState } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import ReactionIcon from '../ReactionIcon';

function CommentFooter(props) {
  const [comment, setComment] = useState(props.comment)
  const [popoverReactions, setPopoverReactions] = useState([]);
  const [allowClick, setAllowClick] = useState(true);
  const reactions = [
    "thumbsup",
    "pog",
    "peepohappy",
    "peepolove",
    "monkaHmm",
    "pepelaugh",
    "kekw",
    "madge",
    "monkaS",
    "sadge",
    "influrUWU",
    "AYAYA",
    "agontfHi",
    "agontfConcern",
    "agontfSure",
    "agontfGift",
    "soulessFF",
    "soulessG",
    "emyyAww",
    "emyyHiYo",
    "muffiS",
    "dqaHi",
    "eschatHwak2",
    "josepa3Riot",
    "treebeardMeep",
    "fluffyBlanket"
  ];

  useEffect(() => {
    setComment(props.comment);
  }, [props.comment])

  useEffect(() => {
    setAllowClick(true);
    if (comment.reactions !== undefined) {
      setPopoverReactions(reactions.filter(reaction =>
      (!Object.keys(comment.reactions).includes(reaction) ||
        comment.reactions[reaction] <= 0)));
    } else {
      setPopoverReactions(reactions);
    }
  }, [comment])

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
    if (comment.reacted === undefined || comment.reacted[props.currentUserInfo.username] === undefined) {
      return false;
    } else {
      //reacted if current is same as reacted emote
      return (comment.reacted[props.currentUserInfo.username] === reaction);
    }
  }

  const usersReacted = reaction => {
    return Object.keys(comment.reacted).filter((user, i) => Object.values(comment.reacted)[i] === reaction);
  }

  const checkReactions = () => {
    if (comment.reactions !== undefined) {
      let reactArr = Object.keys(comment.reactions);
      const sortable = Object.fromEntries(
        Object.entries(comment.reactions).sort(([, a], [, b]) => a - b)
      );
      return (
        Object.keys(sortable).reverse().map(reaction => {
          if (comment.reactions[reaction] > 0) {
            return (
              <div style={{ padding: ".8rem", marginRight: "1rem", position: "relative", bottom: "-1rem", left: "-.7rem" }} key={reaction}>
                <ReactionIcon reaction={reaction} usersReacted={usersReacted(reaction)} reacted={reacted(reaction)} react={react} text={convertNum(comment.reactions[reaction])} id={props.commentId + reaction} />
              </div>
            )
          }
        })
      )
    }
  }

  const popoverStyle = {
    backgroundColor: "#292833",
    boxShadow: "4px 4px 25px 0px #171421 ",
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
    if (comment.reacted === undefined) {
      //hasn't reacted to post
      props.reactToPost(props.currentUserInfo.username, props.commentId, emote, 1, setComment, "comments", props.comment.author, props.comment.postId);
      return;
    }
    //reacted would be undefined if not found and some emote if found
    const reacted = comment.reacted[props.currentUserInfo.username]
    if (reacted === undefined) {
      //hasn't reacted to post
      props.reactToPost(props.currentUserInfo.username, props.commentId, emote, 1, setComment, "comments", props.comment.author, props.comment.postId);
      return;
    } else {
      //reacted to post so check if reacted then unreact else switch reaction
      if (reacted !== emote) {
        //if reacted is some other emote we just switch it
        props.changeReaction(props.currentUserInfo.username, props.commentId, reacted, emote, 1, setComment, "comments");
      } else {
        //deselect current reaction if reacted to same emote
        props.unreactToPost(props.currentUserInfo.username, props.commentId, emote, 1, setComment, "comments");
      }
    }

  }

  const popover = (
    <Popover id={props.commentId + "popvoer"} style={popoverStyle}>
      <Popover.Content>
        <div className="row">
          {popoverReactions.map(reaction => {
            return (
              <div style={{ padding: ".8rem", marginRight: ".3vw" }} key={reaction} className="col-2">
                <ReactionIcon reaction={reaction} react={react} text="" id={props.commentId + reaction} />
              </div>
            )
          })}
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="row justify-content-between" style={{
      paddingBottom: "20px"
    }}>
      <div className="col-8 row justify-content-start" style={{ marginLeft: ".1rem" }}>
        {checkReactions()}
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <div style={{ padding: ".8rem", position: "relative", left: "-1rem", bottom: "-1rem" }}>
              <ReactionIcon react={() => { }} reaction="reactionplus" text="" id={"reaction plus" + props.commentId} />
            </div>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default CommentFooter;
