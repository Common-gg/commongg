import React, { useEffect, useState } from 'react';

function ReactionImage(props) {
  const [image, setImage] = useState("");

  useEffect(() => {
    import(`../images/reactions/${props.reaction}.png`).then(reactionImg => {
        setImage(reactionImg.default);
    });  
  }, []);

  return (
    <img
        style={{
        background: "transparent",
        width: "30px",
        height: "30px",

        }} src={image} alt={props.reaction}
    />
  );
}

export default ReactionImage;
