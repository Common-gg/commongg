import React from 'react';

function SignUpButton(props) {
  return (
    <div className="SignUpButton">
      <button className="btn btn-info" onClick={props.click} >
          Sign Up
      </button>
    </div>
  );
}

export default SignUpButton;
