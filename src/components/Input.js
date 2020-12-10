import React, { useRef } from 'react';

function Input(props) {

  const value = useRef();
  function handleOnKeyDown(e) {
    if ((e.key === "Enter") && (props.type === "password")) {
      props.signInUser(props.email, props.password.current.value);
    }
  }

  return (
    <div className="Input" >
      <input className={props.bootstrap} type={props.type} id={props.type} placeholder={props.placeholder} ref={value}
        onChange={() => (props.track(value))} required
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
    </div>
  );
}

export default Input;
