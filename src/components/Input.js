import React from 'react';

function Input(props) {
  return (
    <div className="Input">
      <input type={props.type} id={props.type+"Input"} placeholder={props.type}/>
    </div>
  );
}

export default Input;
