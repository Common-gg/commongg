import React, { useEffect, useState } from 'react';

function ReactionImage(props) {
  const [image, setImage] = useState("");

  useEffect(() => {
    import(`../images/reactions/${props.reaction}.webp`).then(reactionImg => {
        setImage(reactionImg.default);
    });  
  }, []);

  return (
    <img
        style={{
        background: "transparent",
        width: "20px",
        height: "20px",

        }} src={image} alt={props.reaction}
    />
  );
}

export default ReactionImage;
