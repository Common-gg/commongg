import React, { useEffect, useState } from 'react';
import ReactToolTip from 'react-tooltip';

function ReactionIcon(props) {
  const [image, setImage] = useState("");
  const [toolTipText, setToolTipText] = useState("");

  useEffect(() => {
    if (props.reaction === "reactionplus") {
      import('../images/icons/reactionplus.png').then(reactionImg => {
        setImage(reactionImg.default);
      });
    } else {
      import(`../images/reactions/${props.reaction}.png`).then(reactionImg => {
        setImage(reactionImg.default);
      });
    }
    if (props.usersReacted) {
      if (props.usersReacted.length > 0) {
        let toolTipString = props.usersReacted[0];
        if (props.usersReacted.length > 1) {
          if (props.usersReacted.length === 2) {
            toolTipString += ' and ' + props.usersReacted[1];
          } else {
            toolTipString += ', ' + props.usersReacted[1];
          }
          if (props.usersReacted.length > 2) {
            if (props.usersReacted.length === 3) {
              toolTipString += ', and ' + props.usersReacted[2];
            } else {
              toolTipString += ', ' + props.usersReacted[2];
            }
            if (props.usersReacted.length > 3) {
              toolTipString += ', and ' + (props.usersReacted.length - 3) + ' other users';
            }
          }
        }
        toolTipString += " reacted with " + props.reaction;
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
          width: "30px",
          height: "30px",

        }}>
        <label style={{ cursor: "pointer", }} htmlFor={props.id}>
          <div style={{ border: (props.reacted ? "3px solid #BF9AFC" : null), display: "inline-block", borderRadius: "8px" }}>
            <img
              data-tip={toolTipText}
              style={{
                background: "transparent",
                width: "30px",
                height: "30px",

              }} src={image} alt=" "
            />
          </div>
          {" " + props.text}
        </label>
      </button>
      <ReactToolTip multiline={true} className="tooltip" />
    </div>
  );
}

export default ReactionIcon;
