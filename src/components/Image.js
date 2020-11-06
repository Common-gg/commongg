import React from 'react';

function Image(props) {
  return (
    <div className="Image">
        <img src={props.src} alt="error" width="200" height="200"/>
    </div>
  );
}

export default Image;
