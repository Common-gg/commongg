import React from 'react';

function Image(props) {
  return (
    <div className="Image">
        <img src={props.src} alt="error" width="100%" height="100%"/>
    </div>
  );
}

export default Image;
