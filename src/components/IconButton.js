import React from 'react';

function IconButton(props) {
  return (
    <div className="IconButton">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <button className="btn"
        style={{
          backgroundColor: "transparent",
          padding: "0 0 0 0",
          position: "relative",
          bottom: "-20px",
          left: "-10px"
        }}>
        <i className={props.class} />
        {" " + props.text}
      </button>
    </div>
  );
}

export default IconButton;
