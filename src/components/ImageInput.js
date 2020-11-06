import React from 'react';

function ImageInput(props) {
  return (
    <div className="ImageInput">
      <input type="file" accept="image/*" id={props.type+"Input"}/>
    </div>
  );
}

export default ImageInput;
