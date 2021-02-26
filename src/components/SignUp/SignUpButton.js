import React from 'react';
import arrow from "../../images/icons/arrow-right.png";

function SignUpButton(props) {
  return (
    <div className="SignUpButton" >
      <button className="btn btn-info" onClick={props.click} disabled={props.disabled} style={{
          backgroundColor: "#BF9AFC",
          color: "#2A2A2D",
          border: "solid",
          borderRadius: "10px",
          borderColor: "#BF9AFC",
          borderWidth: "2px",
          padding: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          position: "relative",
          marginTop: "0.5rem",
      }} >
        Sign Up
      </button>
    </div>
  );
}

export default SignUpButton;
