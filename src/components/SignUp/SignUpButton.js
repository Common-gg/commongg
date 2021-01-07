import React from 'react';

function SignUpButton(props) {
  return (
    <div className="SignUpButton" >
      <button className="btn btn-info" onClick={props.click} style={{
          backgroundColor: "transparent",
          color: "#BF9AFC",
          border: "solid",
          borderRadius: "10px",
          borderColor: "#BF9AFC",
          borderWidth: "2px",
      }} >
        Sign Up
      </button>
    </div>
  );
}

export default SignUpButton;
