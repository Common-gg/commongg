import React, { useRef } from 'react';

function Input(props) {

  const value = useRef();

  return (
    <div className="Input">
      <input type={props.type} id={props.type+"Input"} placeholder={props.type} ref={value}
      onChange= {() => (props.track(value)) }/>
    </div>
  );
}

export default Input;
