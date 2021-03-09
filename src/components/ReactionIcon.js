import React, { useEffect, useState } from 'react';
import ReactToolTip from 'react-tooltip';
import * as Icon from 'react-bootstrap-icons';

function ReactionIcon(props) {
  const [image, setImage] = useState("");
  const [toolTipText, setToolTipText] = useState("");

  useEffect(() => {
    if (props.reaction === "reactionplus") {
      import('../images/icons/reactionplus.png').then(reactionImg => {
        setImage(reactionImg.default);
      });
    } else {
      import(`../images/reactions/${props.reaction}.webp`).then(reactionImg => {
        setImage(reactionImg.default);
      });
    }
    if (props.usersReacted) {
      const curUsersReacted = props.usersReacted;
      if (props.usersReacted.length === 1) {
        const toolTipString = `${props.usersReacted[0]} reacted with ${props.reaction}`;
        setToolTipText(toolTipString);
      } else if (curUsersReacted.length === 2) {
        const toolTipString = `${curUsersReacted[0]} and ${curUsersReacted[1]} reacted with ${props.reaction}`;
        setToolTipText(toolTipString);
      } else if (curUsersReacted.length === 3) {
        const toolTipString = `${curUsersReacted[0]}, ${curUsersReacted[1]}, and ${curUsersReacted[2]} reacted with ${props.reaction}`;
        setToolTipText(toolTipString);
      } else if (curUsersReacted.length > 3) {
        const toolTipString = `${curUsersReacted[0]}, ${curUsersReacted[1]}, ${curUsersReacted[2]}, and ${curUsersReacted.length - 3} other users reacted with ${props.reaction}`;
        setToolTipText(toolTipString);
      }
    }
  }, []);

  return (
    <div className="IconButton">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <button
        className="btn"
        id={props.id}
        onClick={() => props.react(props.reaction)}
        style={{
          backgroundColor: "transparent",
          padding: "0 0 0 0",
          position: "relative",
          width: "20px",
          height: "20px",
        }}>
        <label style={{
          cursor: "pointer",
          backgroundColor: (props.reaction !== "reactionplus" && props.text !== 0 ? (props.reacted ? "#5F5177" : "#383241") : null),
          borderRadius: "8px",
          padding: "20%",
          margin: "25%"
        }} htmlFor={props.id}>
          <div style={{
            display: "inline-block",
          }}>
            <img
              data-tip={toolTipText}
              data-for={props.id + "tt"}
              style={{
                width: "25px",
                height: "25px",
              }} src={image} alt=" "
            />
          </div>
          <span style={{ color: "white" }}>{" " + (props.text !== 0 ? props.text : "")}</span>
        </label>
      </button>
      <ReactToolTip id={props.id + "tt"} className="tooltip" />
    </div>
  );
}

export default ReactionIcon;
