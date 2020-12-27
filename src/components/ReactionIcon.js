import React, { useEffect, useState } from 'react';

function ReactionIcon(props) {
  const [image, setImage] = useState("");

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
          height: "30px"
        }}>
        <label style={{cursor: "pointer"}} htmlFor={props.id}>
          <img style={{
            width: "30px",
            height: "30px"
          }} src={image} alt={"reaction: " + props.text + props.reaction} />
          {props.text}
        </label>
      </button>
    </div>
  );
}

export default ReactionIcon;
