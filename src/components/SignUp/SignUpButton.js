import React from 'react';
import arrow from "../../images/icons/arrow-right.png";

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
          left: "0.5rem"
      }} >
        <img src={arrow} />
      </button>
    </div>
  );
}

export default SignUpButton;
