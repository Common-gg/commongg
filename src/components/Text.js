import React from 'react';

function Text(props) {
  return (
    <div className="Text" style={{ color: "#ffffff" }}>
        <p>{props.text}</p>
    </div>
  );
}

export default Text;
