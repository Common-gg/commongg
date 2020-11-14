import React from 'react';

function Label(props) {
  return (
    <div className="Label">
      <label htmlFor={props.htmlFor}>
          {props.text}
      </label>
    </div>
  );
}

export default Label;
