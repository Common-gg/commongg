import React, { useRef } from 'react';

function Input(props) {

  const value = useRef();

  return (
    <div className="Input" style={props.style}>
      <input className={props.bootstrap} type={props.type} id={props.type} placeholder={props.placeholder} ref={value}
        onChange={() => (props.track(value))} required />
    </div>
  );
}

export default Input;
